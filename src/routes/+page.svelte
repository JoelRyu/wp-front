<script>
	import { fade, fly } from 'svelte/transition';
	import { darkMode, showToast } from '$lib/stores';
	import { wallPrayers } from '$lib/data/wall-prayers';

	let prayerTitle = $state('');
	let prayerContent = $state('');
	let isPublic = $state(true);
	let selectedCategory = $state('전체');
	let searchQuery = $state('');
	let isDarkMode = $derived($darkMode);

	const categoryFilters = ['전체', '취업', '가정', '일', '학업', '영적 성장', '건강'];

	const quickMetrics = [
		{ label: '진행 중 기도', value: '128', tone: 'indigo' },
		{ label: '동참한 기도', value: '1,246', tone: 'blue' },
		{ label: '오늘 응답 보고', value: '42', tone: 'green' }
	];

	const features = [
		{ title: '공유형 기도 제목', description: '좋은 목적의 기도 제목을 등록하고 함께 기도하세요.' },
		{ title: '실시간 동참', description: '클릭 한 번으로 기도 모임에 함께할 수 있어요.' },
		{ title: '따뜻한 응답 문화', description: '응답 소식과 감사의 마음을 기록하는 습관을 만들어요.' },
		{ title: '홈에서 바로 시작', description: '홈 바로가기에서 기도 작성, 탐색, 동참까지 끝낼 수 있어요.' }
	];

	const prayerPreviews = wallPrayers;

	let visiblePrayers = $derived.by(() => {
		const query = searchQuery.trim().toLowerCase();
		return prayerPreviews.filter((prayer) => {
			const categoryMatch = selectedCategory === '전체' || prayer.category === selectedCategory;
			const searchMatch = !query
				|| prayer.title.toLowerCase().includes(query)
				|| prayer.content.toLowerCase().includes(query);

			return categoryMatch && searchMatch;
		});
	});

	/**
	 * @param {SubmitEvent} event
	 */
	function handleSubmit(event) {
		event.preventDefault();

		if (!prayerTitle.trim() || !prayerContent.trim()) {
			showToast('기도 제목과 내용을 입력해주세요.', 'warning');
			return;
		}

		console.log('Prayer submitted:', { prayerTitle, prayerContent, isPublic, selectedCategory });
		showToast('기도 제목이 등록됐습니다. 중보기도로 이어갈게요.', 'success');
		prayerTitle = '';
		prayerContent = '';
	}
</script>

<div class={`home-shell ${isDarkMode ? 'home-shell--dark' : 'home-shell--light'}`}>
	<header class="hero" in:fade={{ duration: 350 }}>
		<p class="hero-chip">오늘의 기도 여정</p>
		<h1>하나님의 동행을 시작할 곳, Home</h1>
		<p class="hero-copy">기도를 쓰고, 동행의 손길을 만들고, 감사의 결실을 키우는 중심 공간입니다.</p>

		<div class="hero-actions">
			<a href="/wall" class="btn btn-primary">기도 벽으로 이동</a>
			<a href="#quick-write" class="btn btn-ghost">기도 작성 바로가기</a>
		</div>
	</header>

	<section class="metrics" in:fly={{ y: 16, duration: 450 }}>
		{#each quickMetrics as metric (metric.label)}
			<div class={`metric metric--${metric.tone}`} in:fade={{ duration: 350 }}>
				<p>{metric.label}</p>
				<p>{metric.value}</p>
			</div>
		{/each}
	</section>

	<section class="content-grid">
		<form id="quick-write" class="panel write-panel" onsubmit={handleSubmit} in:fly={{ y: 16, duration: 500 }}>
			<h2>🌱 기도 제목 작성</h2>
			<p>짧은 제목과 마음 한 줄의 기도 내용으로 오늘의 기도 여정을 시작하세요.</p>

			<label for="title" class="field-label">기도 제목</label>
			<input
				id="title"
				type="text"
				placeholder="예: 면접, 회복, 감사의 기도..."
				maxlength="100"
				bind:value={prayerTitle}
			/>
			<p class="helper-text">{prayerTitle.length}/100</p>

			<label for="content" class="field-label">기도 내용</label>
			<textarea
				id="content"
				placeholder="함께 나눌 기도의 내용을 적어주세요."
				rows="6"
				maxlength="1000"
				bind:value={prayerContent}
			></textarea>
			<p class="helper-text">{prayerContent.length}/1000</p>

			<div class="toggle-row">
				<input id="public" type="checkbox" bind:checked={isPublic} />
				<label for="public">Wall에 공개하고 중보기도 동행 초대</label>
			</div>

			<button type="submit" class="btn btn-primary full">기도 제목 올리기</button>
		</form>

		<aside class="panel" in:fly={{ y: 16, duration: 650, delay: 80 }}>
			<h2>💬 시작을 돕는 가이드</h2>
			<div class="feature-list">
				{#each features as feature (feature.title)}
					<div class="feature-item">
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</div>
				{/each}
			</div>
		</aside>
	</section>

	<section class="panel feed-panel" in:fly={{ y: 16, duration: 700, delay: 120 }}>
		<div class="feed-header">
			<h2>🔥 최근 기도 제목</h2>
			<div class="feed-tools">
				<input
					type="text"
					placeholder="검색어 입력"
					aria-label="기도 제목 검색"
					bind:value={searchQuery}
				/>
				<div class="chips">
					{#each categoryFilters as category (category)}
						<button
							type="button"
							class={`chip ${selectedCategory === category ? 'chip--active' : ''}`}
							onclick={() => (selectedCategory = category)}
						>
							{category}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="prayer-grid">
			{#if visiblePrayers.length === 0}
				<p class="empty">표시할 기도 제목이 없습니다.</p>
			{:else}
				{#each visiblePrayers as prayer (prayer.id)}
					<a href={`/wall/${prayer.id}`} class="prayer-card">
						<div class="prayer-meta">
							<span>{prayer.category}</span>
							<span>{prayer.createdAt}</span>
						</div>
						<h3>{prayer.title}</h3>
						<p>{prayer.content}</p>
						<div class="prayer-foot">
							<span>👤 {prayer.author}</span>
							<span>👥 {prayer.participants}명 동참</span>
						</div>
					</a>
				{/each}
			{/if}
		</div>
	</section>
</div>

<style>
	.home-shell {
		min-height: 100vh;
		padding: 2rem 1rem;
		background:
			radial-gradient(1200px 700px at 0% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%),
			radial-gradient(1100px 600px at 100% 15%, color-mix(in oklab, var(--accent-2) 10%, transparent), transparent 72%),
			var(--bg);
		color: var(--text);
	}

	.home-shell--light {
		--bg: #f6f4ef;
		--surface: #ffffff;
		--surface-soft: #f2ede5;
		--text: #1f2937;
		--muted: #6b7280;
		--accent: #0f766e;
		--accent-2: #d97706;
		--line: #e5e7eb;
		--shadow: 0 16px 40px -22px rgba(17, 24, 39, 0.35);
	}

	.home-shell--dark {
		--bg: #0f172a;
		--surface: rgba(30, 41, 59, 0.7);
		--surface-soft: rgba(51, 65, 85, 0.7);
		--text: #f8fafc;
		--muted: #94a3b8;
		--accent: #2dd4bf;
		--accent-2: #f59e0b;
		--line: rgba(148, 163, 184, 0.25);
		--shadow: 0 16px 40px -24px rgba(0, 0, 0, 0.6);
	}

	.hero {
		max-width: 72rem;
		margin: 0 auto;
		padding: 2.5rem 2rem;
		border-radius: 1.5rem;
		backdrop-filter: blur(8px);
		background: color-mix(in oklab, var(--surface) 78%, transparent);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
		display: grid;
		gap: 1rem;
	}

	.hero-chip {
		width: fit-content;
		font-weight: 600;
		font-size: 0.84rem;
		padding: 0.3rem 0.8rem;
		border-radius: 999px;
		background: color-mix(in oklab, var(--accent) 16%, transparent);
		color: var(--accent);
	}

	.hero h1 {
		font-size: clamp(1.8rem, 4vw, 2.7rem);
		font-weight: 800;
		line-height: 1.2;
		margin: 0;
	}

	.hero-copy {
		max-width: 56ch;
		color: var(--muted);
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.8rem;
		font-weight: 700;
		padding: 0.75rem 1.25rem;
		border: 1px solid transparent;
		transition: transform 0.25s, box-shadow 0.25s, background 0.25s, border-color 0.25s;
	}

	.btn:hover {
		transform: translateY(-2px);
	}

	.btn.full {
		width: 100%;
	}

	.btn-primary {
		color: white;
		background: linear-gradient(120deg, var(--accent), var(--accent-2));
		box-shadow: 0 12px 26px -18px rgba(15, 23, 42, 0.45);
	}

	.btn-primary:hover {
		box-shadow: 0 12px 24px -18px rgba(15, 23, 42, 0.6);
	}

	.btn-ghost {
		color: var(--text);
		background: color-mix(in oklab, var(--surface) 92%, transparent);
		border-color: var(--line);
	}

	.metrics {
		margin: 1rem auto 0;
		max-width: 72rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 0.8rem;
	}

	.metric {
		padding: 1rem;
		border-radius: 1rem;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
	}

	.metric p {
		margin: 0;
	}

	.metric p:first-child {
		color: var(--muted);
		font-size: 0.85rem;
	}

	.metric p:last-child {
		font-size: 1.5rem;
		font-weight: 800;
		margin-top: 0.35rem;
	}

	.metric--indigo,
	.metric--blue,
	.metric--green {
		border-color: color-mix(in oklab, var(--accent) 20%, transparent);
	}

	.content-grid {
		max-width: 72rem;
		margin: 1rem auto 0;
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1rem;
	}

	.panel {
		background: color-mix(in oklab, var(--surface) 85%, transparent);
		border: 1px solid var(--line);
		border-radius: 1.25rem;
		padding: 1.25rem;
		box-shadow: var(--shadow);
	}

	.panel h2 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 800;
	}

	.panel p {
		color: var(--muted);
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}

	.field-label {
		display: block;
		font-weight: 600;
		margin-top: 0.9rem;
		margin-bottom: 0.45rem;
		font-size: 0.9rem;
	}

	.write-panel input,
	.write-panel textarea {
		width: 100%;
		border: 1px solid var(--line);
		background: var(--bg);
		color: var(--text);
		border-radius: 0.75rem;
		padding: 0.75rem 0.85rem;
		outline: none;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.write-panel input:focus,
	.write-panel textarea:focus {
		border-color: color-mix(in oklab, var(--accent) 55%, white);
		box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 22%, transparent);
	}

	.helper-text {
		text-align: right;
		margin: 0.35rem 0 0;
		color: var(--muted);
		font-size: 0.75rem;
	}

	.toggle-row {
		margin: 1rem 0 1.2rem;
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.toggle-row input {
		width: 1rem;
		height: 1rem;
	}

	.toggle-row label {
		color: var(--muted);
		font-size: 0.92rem;
	}

	.feature-list {
		display: grid;
		gap: 0.7rem;
	}

	.feature-item {
		border: 1px solid var(--line);
		border-radius: 0.85rem;
		padding: 0.8rem;
		background: color-mix(in oklab, var(--surface-soft) 80%, transparent);
	}

	.feature-item h3 {
		font-size: 0.92rem;
		margin: 0 0 0.2rem;
	}

	.feature-item p {
		margin: 0;
		font-size: 0.88rem;
	}

	.feed-panel {
		max-width: 72rem;
		margin: 1rem auto 0;
	}

	.feed-header {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		margin-bottom: 1rem;
	}

	.feed-tools {
		display: grid;
		gap: 0.8rem;
	}

	.feed-tools input {
		width: 100%;
		border: 1px solid var(--line);
		background: var(--bg);
		color: var(--text);
		border-radius: 0.8rem;
		padding: 0.65rem 0.85rem;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 0.4rem 0.7rem;
		background: color-mix(in oklab, var(--surface) 84%, transparent);
	}

	.chip--active {
		background: color-mix(in oklab, var(--accent) 20%, transparent);
		border-color: color-mix(in oklab, var(--accent) 45%, transparent);
		font-weight: 700;
	}

	.prayer-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.8rem;
	}

	.prayer-card {
		border-radius: 1rem;
		border: 1px solid var(--line);
		padding: 1rem;
		background: color-mix(in oklab, var(--surface-soft) 72%, transparent);
		text-decoration: none;
		color: inherit;
		display: grid;
		gap: 0.5rem;
		transition: transform 0.2s, border-color 0.2s;
	}

	.prayer-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in oklab, var(--accent) 30%, var(--line));
	}

	.prayer-meta {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.prayer-card h3 {
		font-size: 0.97rem;
		line-height: 1.35;
		margin: 0;
	}

	.prayer-card p {
		margin: 0;
		font-size: 0.88rem;
		color: color-mix(in oklab, var(--text) 82%, var(--muted));
	}

	.prayer-foot {
		display: flex;
		justify-content: space-between;
		font-size: 0.79rem;
		color: var(--muted);
	}

	.empty {
		margin: 0;
		color: var(--muted);
		padding: 1rem;
		border: 1px dashed var(--line);
		border-radius: 0.8rem;
		text-align: center;
	}

	@media (max-width: 980px) {
		.content-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.home-shell {
			padding: 1rem 0.75rem;
		}

		.hero {
			padding: 1.5rem;
		}
	}
</style>
