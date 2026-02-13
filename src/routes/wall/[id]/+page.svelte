<script>
	import { fade, fly } from 'svelte/transition';
	import { darkMode, showToast } from '$lib/stores';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	let isDarkMode = $derived($darkMode);
	const prayer = $derived(data.prayer);

	function handleJoinPrayer() {
		showToast(`"${prayer.title}"에 함께 기도할게요.`, 'success');
	}
</script>

<div class={`wall-shell ${isDarkMode ? 'wall-shell--dark' : 'wall-shell--light'}`}>
	<header class="hero" in:fly={{ y: 18, duration: 320 }}>
		<p class="hero-chip">기도의 벽 · 상세 보기</p>
		<h1>{prayer.title}</h1>
		<p class="hero-copy">카테고리와 최신 응답, 동참 상태까지 함께 확인할 수 있습니다.</p>
		<a href="/wall" class="detail-back">← 기도 벽으로 돌아가기</a>
	</header>

	<section class="panel detail-content" in:fade={{ duration: 360, delay: 40 }}>
		<div class="detail-top">
			<span class="detail-category">{prayer.category}</span>
			<div class="detail-stats">
				<p>🕒 {prayer.createdAt}</p>
				<p>👤 {prayer.author}</p>
				<p>👥 {prayer.participants}명 동참</p>
			</div>
		</div>

		<div class="detail-content-box">
			<h2>기도 제목</h2>
			<p>{prayer.content}</p>
		</div>

		<div class="detail-content-box">
			<h2>동참 안내</h2>
			<p>이 기도제목은 <strong>{prayer.isPublic ? '공개' : '비공개'}</strong> 상태입니다.</p>
			<p>함께 동참하면 참여 인원이 증가하고, 기도에 대한 지속적인 응답을 공유할 수 있습니다.</p>
		</div>

		<div class="detail-actions">
			<button type="button" class="btn btn-primary" onclick={handleJoinPrayer}>함께 기도하기</button>
			<a href="/" class="btn btn-ghost">새 기도 제목 쓰기</a>
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
		padding: 2rem;
		border-radius: 1.5rem;
		background: color-mix(in oklab, var(--surface) 82%, transparent);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
	}

	.hero h1 {
		margin: 0 0 0.55rem;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		line-height: 1.2;
		font-weight: 800;
	}

	.hero-copy {
		margin: 0;
		max-width: 60ch;
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

	.detail-back {
		display: inline-block;
		margin-top: 1rem;
		color: var(--text);
		text-decoration: none;
		font-weight: 600;
	}

	.detail-back:hover {
		color: var(--accent);
	}

	.panel {
		max-width: 72rem;
		margin: 1rem auto 0;
		border-radius: 1.2rem;
		border: 1px solid var(--line);
		background: color-mix(in oklab, var(--surface) 86%, transparent);
		box-shadow: var(--shadow);
		padding: 1rem;
	}

	.detail-top {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		flex-wrap: wrap;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid var(--line);
	}

	.detail-category {
		padding: 0.2rem 0.7rem;
		border-radius: 999px;
		font-size: 0.8rem;
		border: 1px solid color-mix(in oklab, var(--accent) 28%, transparent);
		background: color-mix(in oklab, var(--accent) 14%, transparent);
		font-weight: 700;
		align-self: start;
	}

	.detail-stats {
		display: flex;
		gap: 0.9rem;
		flex-wrap: wrap;
		font-size: 0.88rem;
		color: var(--muted);
	}

	.detail-content-box {
		margin-top: 1rem;
		padding: 1rem;
		border-radius: 1rem;
		border: 1px solid var(--line);
		background: color-mix(in oklab, var(--surface-soft) 74%, transparent);
	}

	.detail-content-box h2 {
		margin: 0 0 0.55rem;
		font-size: 1rem;
	}

	.detail-content-box p {
		margin: 0;
		line-height: 1.6;
		color: color-mix(in oklab, var(--text) 88%, var(--muted));
	}

	.detail-content-box + .detail-content-box {
		margin-top: 0.8rem;
	}

	.detail-actions {
		display: flex;
		gap: 0.7rem;
		margin-top: 1rem;
		flex-wrap: wrap;
	}

	.btn {
		border-radius: 0.8rem;
		padding: 0.64rem 1rem;
		font-weight: 700;
		border: 1px solid transparent;
		text-decoration: none;
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

	@media (max-width: 640px) {
		.wall-shell {
			padding: 1rem 0.75rem 2rem;
		}

		.hero {
			padding: 1.3rem;
		}
	}
</style>
