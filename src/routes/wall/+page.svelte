<script>
	import { darkMode, showToast } from '$lib/stores';
	import { fade, fly } from 'svelte/transition';
	import { wallPrayers } from '$lib/data/wall-prayers';

	let selectedFilter = $state('recent');
	let selectedCategory = $state('전체');
	let searchQuery = $state('');
	let isDarkMode = $derived($darkMode);

	const categories = ['전체', '취업', '가정', '일', '학업', '영적 성장', '건강'];

	const sortOptions = [
		{ key: 'recent', label: '최신순' },
		{ key: 'popular', label: '참여순' }
	];

	const filterStats = [
		{ label: '전체 공개 기도', value: '6건', tone: 'indigo' },
		{ label: '참여 인원', value: '198명', tone: 'blue' },
		{ label: '오늘 신규', value: '12건', tone: 'green' }
	];

	const prayers = wallPrayers;

	/** @type {Record<string, number>} */
	const timeAgoToMinutes = {
		'2시간 전': 120,
		'4시간 전': 240,
		'6시간 전': 360,
		'8시간 전': 480,
		'10시간 전': 600,
		'12시간 전': 720
	};

	let filteredPrayers = $derived.by(() => {
		const query = searchQuery.trim().toLowerCase();
		return prayers
			.filter((prayer) => {
				const matchesCategory =
					selectedCategory === '전체' || prayer.category === selectedCategory;

				const matchesSearch =
					!query ||
					prayer.title.toLowerCase().includes(query) ||
					prayer.content.toLowerCase().includes(query);

				return matchesCategory && matchesSearch;
			})
			.sort((a, b) => {
				if (selectedFilter === 'recent') {
					return (
						(timeAgoToMinutes[a.createdAt] ?? Number.MAX_SAFE_INTEGER) -
						(timeAgoToMinutes[b.createdAt] ?? Number.MAX_SAFE_INTEGER)
					);
				}
				return b.participants - a.participants;
			});
	});

	/**
	 * @param {number} id
	 */
	function handleJoinPrayer(id) {
		console.log('Join prayer:', id);
		showToast('함께 기도하겠습니다! 🙏', 'success');
	}
</script>

<div class={`wall-shell ${isDarkMode ? 'wall-shell--dark' : 'wall-shell--light'}`}>
	<header class="hero" in:fly={{ y: 20, duration: 350 }}>
		<p class="hero-chip">기도를 함께 짓는곳</p>
		<h1>기도의 벽</h1>
		<p class="hero-copy">공개된 기도 제목을 검색하고, 마음이 맞는 주제와 함께 기도의 동행자가 되어주세요.</p>
	</header>

	<section class="toolbar" in:fade={{ duration: 300 }}>
		<div class="toolbar-card">
			<label for="search" class="field-label">기도 제목 검색</label>
			<div class="search-wrap">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<input
					id="search"
					type="text"
					placeholder="기도 제목이나 내용을 검색해보세요"
					aria-label="기도 제목 검색"
					bind:value={searchQuery}
				/>
			</div>
		</div>

		<div class="toolbar-card">
			<p class="field-label">정렬</p>
			<div class="chip-row">
				{#each sortOptions as option (option.key)}
					<button
						type="button"
						class={`chip ${selectedFilter === option.key ? 'chip--active' : ''}`}
						onclick={() => (selectedFilter = option.key)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="toolbar-card">
			<p class="field-label">카테고리</p>
			<div class="chip-row">
				{#each categories as category (category)}
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
	</section>

	<section class="stats" in:fly={{ y: 20, duration: 450 }}>
		{#each filterStats as item (item.label)}
			<div class={`stat stat--${item.tone}`}>
				<p>{item.label}</p>
				<p>{item.value}</p>
			</div>
		{/each}
	</section>

	<section class="panel results" in:fly={{ y: 20, duration: 500, delay: 60 }}>
		<div class="results-header">
			<h2>공개 기도 목록</h2>
			<p>총 <strong>{filteredPrayers.length}</strong>건</p>
		</div>

		<div class="prayer-grid">
			{#if filteredPrayers.length === 0}
				<div class="empty-panel">
					<div class="empty-icon">🔍</div>
					<p>표시할 기도 제목이 없습니다.</p>
					<p>검색어 또는 카테고리를 바꿔서 다시 찾아보세요.</p>
				</div>
			{:else}
				{#each filteredPrayers as prayer (prayer.id)}
					<article class="prayer-card">
						<a href={`/wall/${prayer.id}`} class="prayer-card-link">
							<div class="prayer-top">
								<span>{prayer.category}</span>
								<span>{prayer.createdAt}</span>
							</div>
							<h3>{prayer.title}</h3>
							<p>{prayer.content}</p>
							<div class="prayer-foot">
								<span>👤 {prayer.author}</span>
								<span>👥 {prayer.participants}명</span>
							</div>
						</a>
						<button
							type="button"
							class="join-btn"
							onclick={() => handleJoinPrayer(prayer.id)}
						>
							함께 기도하기
						</button>
					</article>
				{/each}
			{/if}
		</div>
	</section>

	<section class="panel cta" in:fade={{ duration: 500, delay: 80 }}>
		<h2>당신의 기도 제목도 올리고 동행을 시작하세요</h2>
		<p>기도는 기도로 끝나지 않습니다. 함께 나누고, 기도하고, 답을 기억하는 여정이 됩니다.</p>
		<div class="cta-actions">
			<a href="/" class="btn btn-primary">기도 올리기</a>
			<a href="/" class="btn btn-ghost">내 기도 기록 보기</a>
		</div>
	</section>
</div>

<style>
	.wall-shell {
		min-height: 100vh;
		padding: 2rem 1rem 2.5rem;
		background:
			radial-gradient(1200px 700px at 0% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 72%),
			radial-gradient(1100px 600px at 100% 14%, color-mix(in oklab, var(--accent-2) 10%, transparent), transparent 72%),
			var(--bg);
		color: var(--text);
	}

	.wall-shell--light {
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

	.wall-shell--dark {
		--bg: #0f172a;
		--surface: rgba(30, 41, 59, 0.7);
		--surface-soft: rgba(51, 65, 85, 0.72);
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
		padding: 2.25rem;
		border-radius: 1.5rem;
		background: color-mix(in oklab, var(--surface) 82%, transparent);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
	}

	.hero h1 {
		margin: 0 0 0.55rem;
		font-size: clamp(1.9rem, 4vw, 2.7rem);
		line-height: 1.2;
		font-weight: 800;
	}

	.hero-copy {
		margin: 0;
		max-width: 64ch;
		color: var(--muted);
		font-size: 1rem;
		line-height: 1.6;
	}

	.hero-chip {
		width: fit-content;
		margin: 0 0 0.8rem;
		padding: 0.3rem 0.8rem;
		border-radius: 999px;
		font-weight: 600;
		font-size: 0.84rem;
		color: var(--accent);
		background: color-mix(in oklab, var(--accent) 16%, transparent);
	}

	.toolbar {
		max-width: 72rem;
		margin: 1rem auto 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.toolbar-card {
		border-radius: 1rem;
		padding: 1rem;
		border: 1px solid var(--line);
		background: color-mix(in oklab, var(--surface) 86%, transparent);
		box-shadow: var(--shadow);
	}

	.field-label {
		display: block;
		margin: 0 0 0.5rem;
		font-weight: 600;
		font-size: 0.88rem;
	}

	.search-wrap {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		border: 1px solid var(--line);
		padding: 0.55rem 0.75rem;
		border-radius: 0.75rem;
		background: var(--bg);
	}

	.search-wrap svg {
		width: 1rem;
		height: 1rem;
		color: var(--muted);
		flex-shrink: 0;
	}

	.search-wrap input {
		width: 100%;
		outline: none;
		border: none;
		color: var(--text);
		background: transparent;
	}

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		border-radius: 999px;
		border: 1px solid var(--line);
		padding: 0.4rem 0.72rem;
		background: color-mix(in oklab, var(--surface) 84%, transparent);
		font-size: 0.86rem;
	}

	.chip--active {
		border-color: color-mix(in oklab, var(--accent) 35%, transparent);
		background: color-mix(in oklab, var(--accent) 22%, transparent);
		font-weight: 700;
	}

	.stats {
		max-width: 72rem;
		margin: 0.9rem auto 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 0.75rem;
	}

	.stat {
		border-radius: 1rem;
		border: 1px solid var(--line);
		padding: 0.9rem;
		box-shadow: var(--shadow);
		background: color-mix(in oklab, var(--surface) 80%, transparent);
	}

	.stat p {
		margin: 0;
	}

	.stat p:first-child {
		color: var(--muted);
		font-size: 0.84rem;
	}

	.stat p:last-child {
		margin-top: 0.45rem;
		font-size: 1.4rem;
		font-weight: 800;
	}

	.stat--indigo,
	.stat--blue,
	.stat--green {
		border-color: color-mix(in oklab, var(--accent) 20%, transparent);
	}

	.panel {
		max-width: 72rem;
		margin: 0.9rem auto 0;
		border-radius: 1.2rem;
		border: 1px solid var(--line);
		background: color-mix(in oklab, var(--surface) 86%, transparent);
		box-shadow: var(--shadow);
	}

	.results {
		padding: 1rem;
	}

	.results-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0 0.25rem 0.85rem;
		border-bottom: 1px solid var(--line);
	}

	.results-header h2 {
		margin: 0;
		font-size: 1.08rem;
	}

	.results-header p {
		margin: 0;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.prayer-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.75rem;
		padding-top: 0.95rem;
	}

	.prayer-card {
		border: 1px solid var(--line);
		border-radius: 1rem;
		padding: 1rem;
		background: color-mix(in oklab, var(--surface-soft) 72%, transparent);
		display: grid;
		gap: 0.55rem;
	}

	.prayer-card-link {
		color: inherit;
		text-decoration: none;
		display: grid;
		gap: 0.55rem;
	}

	.prayer-top {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--muted);
	}

	.prayer-card h3 {
		margin: 0;
		font-size: 1rem;
		line-height: 1.35;
	}

	.prayer-card p {
		margin: 0;
		font-size: 0.88rem;
		color: color-mix(in oklab, var(--text) 82%, var(--muted));
		line-height: 1.55;
	}

	.prayer-foot {
		display: flex;
		justify-content: space-between;
		color: var(--muted);
		font-size: 0.78rem;
	}

	.join-btn {
		justify-self: start;
		margin-top: 0.3rem;
		border-radius: 0.7rem;
		font-weight: 700;
		border: 1px solid transparent;
		padding: 0.48rem 0.84rem;
		color: white;
		background: linear-gradient(120deg, var(--accent), var(--accent-2));
		cursor: pointer;
	}

	.empty-panel {
		grid-column: 1 / -1;
		border-radius: 1rem;
		border: 1px dashed var(--line);
		padding: 2rem 1rem;
		color: var(--muted);
		text-align: center;
	}

	.empty-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	.empty-panel p {
		margin: 0.25rem 0;
	}

	.cta {
		padding: 1.2rem;
	}

	.cta h2 {
		margin: 0 0 0.5rem;
	}

	.cta p {
		margin: 0 0 1rem;
		color: var(--muted);
		max-width: 60ch;
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}

	.btn {
		border-radius: 0.8rem;
		padding: 0.64rem 1rem;
		font-weight: 700;
		border: 1px solid transparent;
		text-decoration: none;
	}

	.btn:hover {
		transform: translateY(-1px);
	}

	.btn-primary {
		color: white;
		background: linear-gradient(120deg, var(--accent), var(--accent-2));
	}

	.btn-ghost {
		color: var(--text);
		background: color-mix(in oklab, var(--surface) 92%, transparent);
		border-color: var(--line);
	}

	@media (max-width: 980px) {
		.toolbar {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.wall-shell {
			padding: 1rem 0.75rem 2rem;
		}
		.hero {
			padding: 1.4rem;
		}
	}
</style>
