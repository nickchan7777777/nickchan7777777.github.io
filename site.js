const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".carousel-track img"));
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const count = carousel.querySelector("[data-carousel-count]");
    const titleTargetId = carousel.dataset.titleTarget;
    const titleTarget = titleTargetId ? document.getElementById(titleTargetId) : null;
    let index = slides.findIndex((slide) => slide.classList.contains("active"));

    if (index < 0) {
        index = 0;
    }

    const showSlide = (nextIndex) => {
        slides[index].classList.remove("active");
        index = (nextIndex + slides.length) % slides.length;
        slides[index].classList.add("active");

        if (count) {
            count.textContent = `${index + 1} / ${slides.length}`;
        }

        if (titleTarget && slides[index].dataset.title) {
            titleTarget.textContent = slides[index].dataset.title;
        }
    };

    showSlide(index);

    if (prev) {
        prev.addEventListener("click", () => showSlide(index - 1));
    }

    if (next) {
        next.addEventListener("click", () => showSlide(index + 1));
    }
});

const revealTargets = document.querySelectorAll(
    ".hero, .bio-grid article, .embedded-site, .page-intro, .project-row, .plant-feature, .timeline-period, .timeline-items section, .docs-content > section, .quiz-hero-card, .quiz-panel, .quiz-card, .quiz-result-panel"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    revealTargets.forEach((target, index) => {
        target.dataset.reveal = "";
        target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
        revealObserver.observe(target);
    });
} else {
    revealTargets.forEach((target) => {
        target.dataset.reveal = "";
        target.classList.add("is-visible");
    });
}

const quizRoot = document.querySelector("[data-hematopoietic-quiz]");

if (quizRoot) {
    const tagLabels = {
        stem: "open potential",
        broad: "system-level flexibility",
        progenitor: "branch-point energy",
        lymphoid: "lymphoid leaning",
        myeloid: "myeloid leaning",
        erythroid: "erythroid output",
        megakaryocyte: "platelet and clotting energy",
        granulocyte: "rapid granulocyte instinct",
        monocytic: "cleanup and remodeling instinct",
        dendritic: "sampling and presenting behavior",
        bcell: "B-cell style memory",
        tcell: "T-cell style coordination",
        nk: "natural killer behavior",
        helper: "coaching and coordination",
        cytotoxic: "decisive action",
        antibody: "precision humoral output",
        plasma: "high-volume secretion",
        innate: "first-response readiness",
        adaptive: "specificity and recall",
        mature: "specialized commitment",
        proliferative: "expansion mode",
        marrow: "bone marrow niche affinity",
        tissue: "tissue-facing behavior",
        patrol: "circulation and surveillance",
        signaling: "signal-driven communication",
        support: "niche support",
        memory: "long-term recall",
        antigen: "antigen interpretation",
        oxygen: "oxygen logistics",
        clotting: "repair and hemostasis",
        interferon: "alarm-broadcasting",
    };

    const lineageLabels = {
        stem: "Stem / multipotent",
        progenitor: "Committed progenitor",
        erythroid: "Erythroid",
        megakaryocyte: "Megakaryocyte / platelet",
        bcell: "B-cell",
        tcell: "T-cell",
        nk: "NK / cytotoxic innate",
        dendritic: "Dendritic",
        monocytic: "Monocytic / macrophage",
        granulocyte: "Granulocyte",
        support: "Stromal niche",
    };

    const cellProfiles = {
        HSC: {
            lineage: "stem",
            blurb: "You are maximally future-facing: calm under uncertainty, hard to pin down, and most valuable when preserving optionality for the whole system.",
            strengths: "Long-run resilience, broad potential, quiet influence from the niche.",
            tags: { stem: 6, broad: 6, progenitor: 4, marrow: 5, support: 2 },
        },
        MPP: {
            lineage: "stem",
            blurb: "You are a high-flexibility generalist who is ready to branch, but not in a rush to over-specialize.",
            strengths: "Versatility, throughput, and poised commitment.",
            tags: { stem: 5, broad: 5, progenitor: 5, marrow: 4, proliferative: 2 },
        },
        CMP: {
            lineage: "progenitor",
            blurb: "You are a practical builder at the myeloid-erythroid fork: less abstract than a stem cell, but still strategic about downstream options.",
            strengths: "Production planning, branching judgment, and grounded execution.",
            tags: { progenitor: 5, myeloid: 4, erythroid: 3, megakaryocyte: 3, marrow: 3 },
        },
        GMP: {
            lineage: "progenitor",
            blurb: "You are tuned for first-response lineages and messy real-world deployment.",
            strengths: "Urgency, tactical commitment, and frontline readiness.",
            tags: { progenitor: 5, myeloid: 5, granulocyte: 4, monocytic: 4, innate: 3 },
        },
        CLP: {
            lineage: "progenitor",
            blurb: "You are an adaptive-minded precursor with strong lymphoid potential and a preference for specificity over brute force.",
            strengths: "Selective commitment, immune intelligence, and training-ground focus.",
            tags: { progenitor: 5, lymphoid: 6, bcell: 3, tcell: 3, nk: 2, adaptive: 3 },
        },
        LMPP: {
            lineage: "progenitor",
            blurb: "You sit at the strange and interesting edge between flexibility and immune commitment.",
            strengths: "Cross-lineage intuition, transition management, and poised identity.",
            tags: { stem: 3, broad: 3, progenitor: 5, lymphoid: 5, myeloid: 2, marrow: 3 },
        },
        MEP: {
            lineage: "progenitor",
            blurb: "You favor high-output lineages that keep the body supplied and protected.",
            strengths: "Efficiency, stability, and system maintenance.",
            tags: { progenitor: 5, erythroid: 5, megakaryocyte: 5, clotting: 2, oxygen: 2 },
        },
        MKP: {
            lineage: "megakaryocyte",
            blurb: "You are a repair-minded specialist in the making, oriented toward structural backup and fast damage control.",
            strengths: "Stabilization, repair planning, and decisive output.",
            tags: { progenitor: 4, megakaryocyte: 6, clotting: 5, marrow: 3, mature: 2 },
        },
        "Early Erythroid Progenitor": {
            lineage: "erythroid",
            blurb: "You are in visible build mode: committed to one path, still expanding, and moving toward streamlined performance.",
            strengths: "Focused scaling, production discipline, and early specialization.",
            tags: { progenitor: 3, erythroid: 6, proliferative: 5, oxygen: 2, marrow: 2 },
        },
        "Late Erythroid Progenitor": {
            lineage: "erythroid",
            blurb: "You have chosen the red-cell path and are polishing away everything nonessential.",
            strengths: "Refinement, efficiency, and near-final specialization.",
            tags: { erythroid: 6, mature: 4, oxygen: 4, proliferative: 2 },
        },
        Reticulocyte: {
            lineage: "erythroid",
            blurb: "You are almost fully deployed: lean, mobile, and built to keep the system moving.",
            strengths: "Readiness, movement, and functional simplicity.",
            tags: { erythroid: 6, mature: 5, oxygen: 6, patrol: 2 },
        },
        "Basophil/Mast/Eosinophil": {
            lineage: "granulocyte",
            blurb: "You are intense, reactive, and a little dramatic in a useful way.",
            strengths: "Rapid signaling, tissue sensitivity, and forceful escalation.",
            tags: { myeloid: 3, granulocyte: 6, innate: 5, tissue: 4, signaling: 3 },
        },
        "Pro B cell": {
            lineage: "bcell",
            blurb: "You are early in the B-lineage identity arc: committed, exploratory, and still assembling the full toolkit.",
            strengths: "Potential, selective training, and adaptive trajectory.",
            tags: { progenitor: 4, lymphoid: 4, bcell: 5, proliferative: 3, adaptive: 2 },
        },
        "Large Pre-B cell": {
            lineage: "bcell",
            blurb: "You are in expansion mode after finding a viable path.",
            strengths: "Scale, momentum, and decisive growth.",
            tags: { lymphoid: 4, bcell: 5, proliferative: 6, adaptive: 2, mature: 1 },
        },
        "Small Pre-B cell": {
            lineage: "bcell",
            blurb: "You are a quieter optimizer: less explosive than before, more selective, and closer to functional maturity.",
            strengths: "Calibration, refinement, and disciplined transition.",
            tags: { lymphoid: 4, bcell: 5, proliferative: 2, adaptive: 2, mature: 3 },
        },
        "Immature B cell": {
            lineage: "bcell",
            blurb: "You have the outline of a full B-cell identity and are starting to test it against the world.",
            strengths: "Emerging specificity, adaptive readiness, and self-editing.",
            tags: { bcell: 6, adaptive: 4, mature: 3, antigen: 1, lymphoid: 3 },
        },
        "Transitional B cell": {
            lineage: "bcell",
            blurb: "You are between training and full deployment, balancing caution with increasing independence.",
            strengths: "Adjustment, survival, and measured maturation.",
            tags: { bcell: 6, adaptive: 4, mature: 4, signaling: 1, lymphoid: 3 },
        },
        "Mature-naive B cell": {
            lineage: "bcell",
            blurb: "You are competent, poised, and waiting for the right exact signal before going all in.",
            strengths: "Prepared specificity, restraint, and readiness.",
            tags: { bcell: 6, adaptive: 5, mature: 5, antigen: 2, lymphoid: 3 },
        },
        "Memory B cell": {
            lineage: "bcell",
            blurb: "You remember patterns, learn from history, and come back sharper the next time.",
            strengths: "Recall, pattern retention, and long-term adaptive strategy.",
            tags: { bcell: 6, adaptive: 6, mature: 5, memory: 6, antibody: 2 },
        },
        "Plasma cell": {
            lineage: "bcell",
            blurb: "You are an output machine: highly differentiated, focused, and not interested in doing ten different jobs halfway.",
            strengths: "Volume, commitment, and decisive secretion.",
            tags: { bcell: 4, adaptive: 4, mature: 6, plasma: 6, antibody: 6 },
        },
        "CD8 T cell": {
            lineage: "tcell",
            blurb: "You are precise, lethal, and happiest when the objective is clear.",
            strengths: "Targeted action, discipline, and follow-through.",
            tags: { tcell: 6, adaptive: 5, mature: 5, cytotoxic: 6, patrol: 2 },
        },
        "CD4 T cell": {
            lineage: "tcell",
            blurb: "You coordinate, coach, and make everyone else better at their jobs.",
            strengths: "Leadership, cytokine logic, and system calibration.",
            tags: { tcell: 6, adaptive: 5, mature: 5, helper: 6, signaling: 5 },
        },
        "Pro-Monocyte": {
            lineage: "monocytic",
            blurb: "You are the early version of a cleanup-and-remodeling specialist: committed, mobile, and still maturing.",
            strengths: "Transition readiness, mobility, and downstream potential.",
            tags: { progenitor: 4, myeloid: 4, monocytic: 5, innate: 3, patrol: 2 },
        },
        Monocyte: {
            lineage: "monocytic",
            blurb: "You patrol, assess, and keep options open between surveillance and response.",
            strengths: "Mobility, observation, and frontline flexibility.",
            tags: { myeloid: 4, monocytic: 6, innate: 5, patrol: 5, mature: 4 },
        },
        "CD16 Monocyte": {
            lineage: "monocytic",
            blurb: "You are the patrol-heavy monocyte: observant, boundary-aware, and tuned to subtle shifts.",
            strengths: "Surveillance, tissue-border awareness, and nuanced response.",
            tags: { myeloid: 4, monocytic: 6, innate: 5, patrol: 6, signaling: 2, mature: 4 },
        },
        Macrophage: {
            lineage: "monocytic",
            blurb: "You settle into the tissue, clean up the mess, and make the environment workable again.",
            strengths: "Engulfment, remodeling, persistence, and local support.",
            tags: { myeloid: 4, monocytic: 6, innate: 6, tissue: 6, support: 3, mature: 5 },
        },
        Neutrophil: {
            lineage: "granulocyte",
            blurb: "You are pure first-response energy: immediate, effective, and not especially sentimental about it.",
            strengths: "Speed, deployment, and frontline force.",
            tags: { myeloid: 4, granulocyte: 6, innate: 6, patrol: 5, cytotoxic: 3, mature: 5 },
        },
        Stroma: {
            lineage: "support",
            blurb: "You are not here for spotlight metabolism. You build the niche, hold the structure together, and change what everyone else can become.",
            strengths: "Support, environmental shaping, and quiet long-range impact.",
            tags: { support: 6, marrow: 5, signaling: 4, tissue: 3, broad: 1 },
        },
        "Conventional Dendritic Cell": {
            lineage: "dendritic",
            blurb: "You gather evidence, interpret it, and brief the adaptive arm with unusual efficiency.",
            strengths: "Presentation, translation, and immune orchestration.",
            tags: { dendritic: 6, antigen: 6, signaling: 4, adaptive: 3, mature: 4, tissue: 2 },
        },
        "Plasmacytoid Dendritic Cell": {
            lineage: "dendritic",
            blurb: "You are a highly tuned alarm system with a taste for dramatic broadcast responses.",
            strengths: "Interferon-heavy signaling, sensing, and escalation.",
            tags: { dendritic: 6, interferon: 6, signaling: 5, innate: 4, antigen: 2, mature: 4 },
        },
        "NK cell": {
            lineage: "nk",
            blurb: "You are fast, intuitive, and action-oriented, with less need for committee approval than most adaptive types.",
            strengths: "Cytotoxic instinct, patrol logic, and fast judgment.",
            tags: { nk: 6, innate: 6, cytotoxic: 6, patrol: 4, mature: 4 },
        },
    };

    const questions = [
        {
            id: "habitat",
            prompt: "Where do you do your best work?",
            options: [
                {
                    title: "Protected niche",
                    detail: "I like a stable base where I can stay flexible and think long-term.",
                    tags: { stem: 3, broad: 2, marrow: 3, progenitor: 1 },
                },
                {
                    title: "Training ground",
                    detail: "I like checkpoints, identity formation, and a little selective pressure.",
                    tags: { lymphoid: 2, bcell: 1, tcell: 1, adaptive: 1, proliferative: 3, progenitor: 2 },
                },
                {
                    title: "Fast circulation",
                    detail: "I want movement, timing, and immediate deployment.",
                    tags: { innate: 2, patrol: 3, mature: 2, monocytic: 1, granulocyte: 1, nk: 1, oxygen: 1 },
                },
                {
                    title: "Busy tissue front",
                    detail: "I like repair, cleanup, signaling, and direct contact with the environment.",
                    tags: { tissue: 3, monocytic: 2, dendritic: 1, support: 1, signaling: 2 },
                },
            ],
        },
        {
            id: "role",
            prompt: "What role do you naturally take in a group?",
            options: [
                {
                    title: "Keep options open",
                    detail: "I preserve flexibility and avoid locking into one path too early.",
                    tags: { stem: 3, broad: 3, progenitor: 2 },
                },
                {
                    title: "Build the production line",
                    detail: "I like turning vague possibility into scalable downstream output.",
                    tags: { progenitor: 2, proliferative: 3, myeloid: 1, lymphoid: 1, erythroid: 1, megakaryocyte: 1 },
                },
                {
                    title: "Carry essential cargo",
                    detail: "I keep the whole system supplied and functioning.",
                    tags: { erythroid: 4, oxygen: 4, mature: 1 },
                },
                {
                    title: "Stabilize damage",
                    detail: "I seal leaks, preserve structure, and help the system recover.",
                    tags: { megakaryocyte: 4, clotting: 4, support: 1, mature: 1 },
                },
            ],
        },
        {
            id: "conflict",
            prompt: "When something goes wrong, what is your instinct?",
            options: [
                {
                    title: "Coach and coordinate",
                    detail: "I get the right people aligned and tune the response.",
                    tags: { helper: 4, signaling: 4, adaptive: 2, tcell: 2 },
                },
                {
                    title: "Present the evidence",
                    detail: "I gather the facts and brief the rest of the team.",
                    tags: { dendritic: 4, antigen: 4, signaling: 2, adaptive: 1 },
                },
                {
                    title: "Act immediately",
                    detail: "I am comfortable being the fast, decisive one.",
                    tags: { cytotoxic: 4, innate: 2, nk: 2, tcell: 1, granulocyte: 1 },
                },
                {
                    title: "Swarm and clean up",
                    detail: "I would rather contain the mess directly than debate it.",
                    tags: { monocytic: 3, granulocyte: 2, innate: 2, tissue: 2 },
                },
            ],
        },
        {
            id: "phase",
            prompt: "Which life phase sounds most like you right now?",
            options: [
                {
                    title: "Multipurpose era",
                    detail: "I am still broad, exploratory, and not ready to specialize hard.",
                    tags: { stem: 3, broad: 2, progenitor: 3 },
                },
                {
                    title: "Expansion era",
                    detail: "I found a direction and now I am scaling fast.",
                    tags: { proliferative: 5, progenitor: 2, bcell: 1, erythroid: 1 },
                },
                {
                    title: "Refinement era",
                    detail: "I am sharpening one specific identity and stripping away extra noise.",
                    tags: { mature: 2, erythroid: 1, bcell: 1, myeloid: 1, megakaryocyte: 1 },
                },
                {
                    title: "Specialist era",
                    detail: "I know my function and I am comfortable being specific.",
                    tags: { mature: 4, memory: 1, plasma: 1, tissue: 1 },
                },
            ],
        },
        {
            id: "communication",
            prompt: "What kind of communication feels most natural?",
            options: [
                {
                    title: "Long-term memory",
                    detail: "I prefer responses that get smarter after prior experience.",
                    tags: { adaptive: 3, bcell: 2, memory: 4, antibody: 1 },
                },
                {
                    title: "Signals and calibration",
                    detail: "I like tuning the whole network through communication.",
                    tags: { signaling: 4, helper: 2, dendritic: 1, support: 1 },
                },
                {
                    title: "Minimal talk, direct action",
                    detail: "Once something is clear, I would rather just do the job.",
                    tags: { innate: 2, cytotoxic: 3, granulocyte: 2, nk: 1 },
                },
                {
                    title: "Alarm broadcast",
                    detail: "If something looks wrong, everyone should know immediately.",
                    tags: { interferon: 4, dendritic: 2, innate: 2, signaling: 2 },
                },
            ],
        },
        {
            id: "output",
            prompt: "Pick the output that sounds most like your personality.",
            options: [
                {
                    title: "Oxygen delivery",
                    detail: "Simple, essential, relentless throughput.",
                    tags: { erythroid: 5, oxygen: 5, mature: 2 },
                },
                {
                    title: "Platelet logistics",
                    detail: "Contain damage fast and restore basic integrity.",
                    tags: { megakaryocyte: 5, clotting: 5, mature: 2 },
                },
                {
                    title: "Antibody manufacturing",
                    detail: "Specialized output at high volume after the right trigger.",
                    tags: { bcell: 2, plasma: 5, antibody: 5, adaptive: 2 },
                },
                {
                    title: "Cleanup and remodeling",
                    detail: "Remove junk, reset the environment, and make the tissue workable again.",
                    tags: { monocytic: 4, tissue: 4, innate: 2, support: 1 },
                },
            ],
        },
        {
            id: "social",
            prompt: "Which social pattern fits you best?",
            options: [
                {
                    title: "Every door stays open",
                    detail: "I dislike shutting down possibilities too early.",
                    tags: { stem: 3, broad: 3 },
                },
                {
                    title: "One track, done well",
                    detail: "I prefer committing and then improving within that lane.",
                    tags: { mature: 2, adaptive: 1, innate: 1 },
                },
                {
                    title: "I remember everything",
                    detail: "Past encounters absolutely change how I behave next time.",
                    tags: { memory: 5, adaptive: 2, bcell: 1, tcell: 1 },
                },
                {
                    title: "I mature through awkward transitions",
                    detail: "My best work comes after a few weird intermediate stages.",
                    tags: { proliferative: 1, mature: 2, progenitor: 1, bcell: 2, erythroid: 2 },
                },
            ],
        },
        {
            id: "hiddenTalent",
            prompt: "What hidden talent feels most like yours?",
            options: [
                {
                    title: "Supporting other people's growth",
                    detail: "I shape the environment so everyone else can succeed.",
                    tags: { support: 5, marrow: 2, signaling: 2, tissue: 1 },
                },
                {
                    title: "Boundary patrol",
                    detail: "I notice subtle shifts before they become obvious problems.",
                    tags: { patrol: 5, monocytic: 2, nk: 1, innate: 1 },
                },
                {
                    title: "Reading the room biologically",
                    detail: "I sample the environment and translate it into useful meaning.",
                    tags: { antigen: 5, dendritic: 4, signaling: 1 },
                },
                {
                    title: "Surviving pressure cleanly",
                    detail: "I stay functional without making the whole process dramatic.",
                    tags: { mature: 2, innate: 1, adaptive: 1, granulocyte: 1, monocytic: 1 },
                },
            ],
        },
        {
            id: "aesthetic",
            prompt: "Choose your ideal biological aesthetic.",
            options: [
                {
                    title: "Bone marrow atelier",
                    detail: "Protected, weirdly fertile, and full of futures.",
                    tags: { marrow: 4, stem: 2, progenitor: 2, support: 1 },
                },
                {
                    title: "Germinal-center archive",
                    detail: "Iterative, selective, memory-rich, and a little intense.",
                    tags: { bcell: 2, adaptive: 3, memory: 2, proliferative: 1 },
                },
                {
                    title: "Inflamed tissue workshop",
                    detail: "Messy, urgent, and impossible to ignore.",
                    tags: { tissue: 4, monocytic: 2, granulocyte: 2, innate: 2 },
                },
                {
                    title: "Cytotoxic bootcamp",
                    detail: "Focused, spare, efficient, unsentimental.",
                    tags: { cytotoxic: 4, tcell: 1, nk: 2, mature: 1 },
                },
            ],
        },
        {
            id: "tagline",
            prompt: "Pick the tagline that fits you best.",
            options: [
                {
                    title: "Potential is power",
                    detail: "My value comes from possibility before commitment.",
                    tags: { stem: 4, broad: 3, progenitor: 1 },
                },
                {
                    title: "Specificity wins",
                    detail: "Precision matters more than generalized force.",
                    tags: { adaptive: 2, antigen: 2, bcell: 1, tcell: 1, mature: 1 },
                },
                {
                    title: "First response, no drama",
                    detail: "I like being useful immediately.",
                    tags: { innate: 3, granulocyte: 2, monocytic: 1, nk: 1 },
                },
                {
                    title: "Build and maintain the system",
                    detail: "I like infrastructure, buffering, and keeping the whole thing alive.",
                    tags: { support: 3, marrow: 2, clotting: 1, megakaryocyte: 1 },
                },
            ],
        },
    ];

    const decisionTreeSections = [
        {
            title: "Stem and broad progenitor states",
            summary: "If your answers emphasize optionality, niche affinity, and future potential, the quiz stays high in the hierarchy.",
            cells: ["HSC", "MPP", "LMPP"],
        },
        {
            title: "Lineage commitment nodes",
            summary: "If you sound like a branch-point strategist or production planner, the quiz moves you toward committed progenitors.",
            cells: ["CMP", "GMP", "CLP", "MEP", "MKP"],
        },
        {
            title: "Erythroid and megakaryocyte output",
            summary: "If you prefer throughput, oxygen logistics, or clotting-and-repair behavior, the quiz shifts toward red cell and platelet lineages.",
            cells: ["Early Erythroid Progenitor", "Late Erythroid Progenitor", "Reticulocyte", "MEP", "MKP"],
        },
        {
            title: "B-cell maturation path",
            summary: "If memory, specificity, and antibody-style output dominate, the quiz walks down the B-cell developmental sequence.",
            cells: ["Pro B cell", "Large Pre-B cell", "Small Pre-B cell", "Immature B cell", "Transitional B cell", "Mature-naive B cell", "Memory B cell", "Plasma cell"],
        },
        {
            title: "T-cell and NK effector logic",
            summary: "If your answers favor coordination, precision killing, or intuitive patrol, the quiz routes through cytotoxic and helper lymphoid identities.",
            cells: ["CD4 T cell", "CD8 T cell", "NK cell"],
        },
        {
            title: "Myeloid, dendritic, and tissue-facing behavior",
            summary: "If you sound like a sampler, cleaner, presenter, or first responder, the quiz trends toward innate immune identities.",
            cells: ["Pro-Monocyte", "Monocyte", "CD16 Monocyte", "Macrophage", "Neutrophil", "Conventional Dendritic Cell", "Plasmacytoid Dendritic Cell", "Basophil/Mast/Eosinophil"],
        },
        {
            title: "Niche support identity",
            summary: "If your answers center on enabling other cells rather than being the main effector, the quiz can land on structural support.",
            cells: ["Stroma"],
        },
    ];

    const buildQuiz = () => {
        quizRoot.innerHTML = `
            <div class="quiz-layout">
                <aside class="quiz-panel">
                    <h3>Lineage Readout</h3>
                    <p>Answer every question, then the quiz scores your traits against hematopoietic fate profiles.</p>
                    <div class="quiz-progress" aria-live="polite">
                        <div class="quiz-progress-track" aria-hidden="true">
                            <div class="quiz-progress-bar" data-quiz-progress-bar style="width: 0%"></div>
                        </div>
                        <div class="quiz-progress-meta">
                            <span data-quiz-progress-text>0 / ${questions.length} answered</span>
                            <span data-quiz-progress-percent>0%</span>
                        </div>
                    </div>
                    <p class="quiz-status" data-quiz-status></p>
                </aside>
                <div>
                    <form class="quiz-form" data-quiz-form></form>
                    <section class="quiz-result-panel" data-quiz-result hidden aria-live="polite"></section>
                </div>
            </div>
            <div class="quiz-lightbox" data-quiz-lightbox hidden>
                <button class="quiz-lightbox-backdrop" type="button" data-quiz-lightbox-close aria-label="Close cell fate tree"></button>
                <div class="quiz-lightbox-panel" role="dialog" aria-modal="true" aria-labelledby="quiz-tree-title">
                    <button class="quiz-lightbox-close" type="button" data-quiz-lightbox-close aria-label="Close cell fate tree">×</button>
                    <p class="eyebrow">Decision Tree</p>
                    <h3 id="quiz-tree-title">How the quiz branches through the hematopoietic system</h3>
                    <p class="quiz-tree-intro">This is a simplified fate map for the personality logic in the quiz. It is not a strict biological differentiation diagram, but it shows the main routing ideas used by the scorer.</p>
                    <div class="quiz-tree-grid">
                        ${decisionTreeSections.map((section) => `
                            <article class="quiz-tree-branch">
                                <h4>${section.title}</h4>
                                <p>${section.summary}</p>
                                <ul>
                                    ${section.cells.map((cell) => `<li>${cell}</li>`).join("")}
                                </ul>
                            </article>
                        `).join("")}
                    </div>
                </div>
            </div>
        `;

        const form = quizRoot.querySelector("[data-quiz-form]");

        questions.forEach((question, questionIndex) => {
            const fieldset = document.createElement("fieldset");
            fieldset.className = "quiz-card";
            fieldset.dataset.quizQuestion = question.id;

            const legend = document.createElement("legend");
            legend.innerHTML = `<span class="quiz-card-number">Question ${questionIndex + 1}</span>${question.prompt}`;
            fieldset.appendChild(legend);

            const options = document.createElement("div");
            options.className = "quiz-options";

            question.options.forEach((option, optionIndex) => {
                const label = document.createElement("label");
                label.className = "quiz-option";

                const input = document.createElement("input");
                input.type = "radio";
                input.name = question.id;
                input.value = String(optionIndex);
                input.required = true;

                const card = document.createElement("span");
                card.className = "quiz-option-card";
                card.innerHTML = `<strong>${option.title}</strong><span>${option.detail}</span>`;

                label.appendChild(input);
                label.appendChild(card);
                options.appendChild(label);
            });

            fieldset.appendChild(options);
            form.appendChild(fieldset);
        });

        const actions = document.createElement("div");
        actions.className = "quiz-actions";
        actions.innerHTML = `
            <button class="quiz-button" type="submit">Reveal my cell type</button>
            <button class="quiz-button secondary" type="button" data-quiz-reset>Reset quiz</button>
        `;
        form.appendChild(actions);
    };

    const getAnsweredCount = (form) => {
        return questions.filter((question) => form.querySelector(`input[name="${question.id}"]:checked`)).length;
    };

    const updateProgress = (form) => {
        const answered = getAnsweredCount(form);
        const percent = Math.round((answered / questions.length) * 100);
        const progressBar = quizRoot.querySelector("[data-quiz-progress-bar]");
        const progressText = quizRoot.querySelector("[data-quiz-progress-text]");
        const progressPercent = quizRoot.querySelector("[data-quiz-progress-percent]");
        const status = quizRoot.querySelector("[data-quiz-status]");

        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${answered} / ${questions.length} answered`;
        progressPercent.textContent = `${percent}%`;

        if (answered === questions.length) {
            status.dataset.state = "ready";
            status.textContent = "All questions answered. You can reveal your lineage call.";
        } else {
            status.dataset.state = "";
            status.textContent = "";
        }
    };

    const computeResult = (form) => {
        const tagTotals = {};

        questions.forEach((question) => {
            const selected = form.querySelector(`input[name="${question.id}"]:checked`);
            const selectedOption = question.options[Number(selected.value)];

            Object.entries(selectedOption.tags).forEach(([tag, value]) => {
                tagTotals[tag] = (tagTotals[tag] || 0) + value;
            });
        });

        const ranked = Object.entries(cellProfiles)
            .map(([cellName, profile]) => {
                let score = 0;
                const contributions = [];

                Object.entries(profile.tags).forEach(([tag, weight]) => {
                    const total = tagTotals[tag] || 0;

                    if (total > 0) {
                        const contribution = total * weight;
                        score += contribution;
                        contributions.push({ tag, contribution });
                    }
                });

                contributions.sort((a, b) => b.contribution - a.contribution);

                return {
                    cellName,
                    profile,
                    score,
                    contributions,
                };
            })
            .sort((a, b) => b.score - a.score);

        return { ranked, tagTotals };
    };

    const renderResult = (result) => {
        const resultPanel = quizRoot.querySelector("[data-quiz-result]");
        const topMatch = result.ranked[0];
        const closeMatches = result.ranked.slice(1, 4);
        const traitChips = topMatch.contributions.slice(0, 4).map((item) => tagLabels[item.tag] || item.tag);
        const lineage = lineageLabels[topMatch.profile.lineage] || "Hematopoietic";

        resultPanel.hidden = false;
        resultPanel.innerHTML = `
            <div class="quiz-result-header">
                <div class="quiz-result-header-copy">
                    <p class="quiz-result-kicker">Best match</p>
                    <h2 class="quiz-result-name">${topMatch.cellName}</h2>
                </div>
                <div class="quiz-lineage-chip">${lineage}</div>
            </div>
            <div class="quiz-result-grid">
                <div class="quiz-top-match">
                    <p>${topMatch.profile.blurb}</p>
                    <p><strong>Why this matched:</strong> ${topMatch.profile.strengths}</p>
                    <ul class="quiz-tag-list">
                        ${traitChips.map((trait) => `<li>${trait}</li>`).join("")}
                    </ul>
                </div>
                <div>
                    <h3>Close matches</h3>
                    <ul class="quiz-close-matches">
                        ${closeMatches.map((match) => `<li><span>${match.cellName}</span>${lineageLabels[match.profile.lineage] || "Hematopoietic"}</li>`).join("")}
                    </ul>
                </div>
            </div>
            <div class="quiz-lightbox-trigger">
                <button class="quiz-button secondary" type="button" data-open-quiz-lightbox>Reveal cell fate decision tree</button>
            </div>
        `;

        resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    buildQuiz();

    const form = quizRoot.querySelector("[data-quiz-form]");
    const resetButton = quizRoot.querySelector("[data-quiz-reset]");
    const status = quizRoot.querySelector("[data-quiz-status]");
    const resultPanel = quizRoot.querySelector("[data-quiz-result]");
    const lightbox = quizRoot.querySelector("[data-quiz-lightbox]");

    const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.style.overflow = "";
    };

    const openLightbox = () => {
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
    };

    form.addEventListener("change", () => {
        updateProgress(form);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (getAnsweredCount(form) !== questions.length) {
            status.dataset.state = "error";
            status.textContent = "Answer every question before revealing your cell type.";
            return;
        }

        status.dataset.state = "ready";
        status.textContent = "Lineage call complete.";
        renderResult(computeResult(form));
    });

    quizRoot.addEventListener("click", (event) => {
        const openTrigger = event.target.closest("[data-open-quiz-lightbox]");
        const closeTrigger = event.target.closest("[data-quiz-lightbox-close]");

        if (openTrigger) {
            openLightbox();
        }

        if (closeTrigger) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }
    });

    resetButton.addEventListener("click", () => {
        form.reset();
        resultPanel.hidden = true;
        resultPanel.innerHTML = "";
        closeLightbox();
        status.dataset.state = "";
        status.textContent = "";
        updateProgress(form);
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    updateProgress(form);
}
