<div class="hero-bg" aria-hidden="true">
	<div class="dot-grid"></div>
	<div class="glow glow-1"></div>
	<div class="glow glow-2"></div>
	<div class="glow glow-3"></div>
</div>

<style>
	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.dot-grid {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(
			circle,
			color-mix(in srgb, var(--color-accent) 25%, transparent) 1px,
			transparent 1px
		);
		background-size: 28px 28px;
		animation: drift 20s ease-in-out infinite alternate;
		mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
	}

	.glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.18;
		animation: pulse-glow 8s ease-in-out infinite alternate;
	}

	.glow-1 {
		width: 500px;
		height: 500px;
		top: -120px;
		left: -80px;
		background: var(--color-accent);
		animation-delay: 0s;
	}

	.glow-2 {
		width: 400px;
		height: 400px;
		bottom: -60px;
		right: -60px;
		background: #ec4899;
		animation-delay: 3s;
	}

	.glow-3 {
		width: 300px;
		height: 300px;
		top: 40%;
		left: 55%;
		background: #06b6d4;
		animation-delay: 6s;
	}

	@keyframes drift {
		from { background-position: 0 0; }
		to { background-position: 14px 14px; }
	}

	@keyframes pulse-glow {
		from { opacity: 0.12; transform: scale(1); }
		to { opacity: 0.22; transform: scale(1.08); }
	}

	@media (prefers-reduced-motion: reduce) {
		.dot-grid { animation: none; }
		.glow { animation: none; }
	}
</style>
