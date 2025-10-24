(() => {
    const header = document.querySelector("header");
    const btn = document.querySelector(".menu-toggle");
    const nav = document.getElementById("primary-navigation");
    if (!header || !btn || !nav) return;

    const html = document.documentElement;

    const getFocusable = () =>
        nav.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        let lastFocused = null;

        function openMenu() {
            lastFocused = document.activeElement;
            header.classList.add("is-open");
            btn.classList.add("is-active");
            btn.setAttribute("aria-expanded", "true");
            html.classList.add("no-scroll");

            const focusables = getFocusable();
            if (focusables.length) focusables[0].focus();
        }

        function closeMenu() {
            header.classList.remove("is-open");
            btn.classList.remove("is-active");
            btn.setAttribute("aria-expanded", "false");
            html.classList.remove("no-scroll");

            if (lastFocused && typeof lastFocused.focus === "function") {
                lastFocused.focus();
            } else {
                btn.focus();
            }
        }

        function toggle() {
            const isOpen = header.classList.contains("is-open");
            isOpen ? closeMenu() : openMenu();
        }

        btn.addEventListener("click", toggle);

        nav.addEventListener("click", (e) => {
            const target = e.target;
            const anchor = target && target.closest ? target.closest("a") : null;
            if (anchor) closeMenu();
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeMenu();
        });

        document.addEventListener("click", (e) => {
            if (!header.classList.contains("is-open")) return;
            const target = e.target;
            const clickedInsideNav = nav.contains(target);
            const clickedToggle = btn.contains(target);
            if (!clickedInsideNav && !clickedToggle) closeMenu();
        });

        nav.addEventListener("keydown", (e) => {
            if (!header.classList.contains("is-open") || e.key !== "Tab") return;
            const focusables = Array.from(getFocusable());
            if (!focusables.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        });

        window.addEventListener("resize", () => {
            const isDesktop = window.matchMedia("(min-width: 900px)").matches;
            if (isDesktop) {
                header.classList.remove("is-open");
                btn.classList.remove("is-active");
                btn.setAttribute("aria-expanded", "false");
                html.classList.remove("no-scroll");
            }
        });
})();
