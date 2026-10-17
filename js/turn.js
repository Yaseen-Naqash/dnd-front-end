
      (function () {
        // TABS
        const tabs = document.querySelectorAll(".tab-btn");
        const panes = {
          stats: document.getElementById("tab-stats"),
          spells: document.getElementById("tab-spells"),
          bag: document.getElementById("tab-bag"),
        };

        tabs.forEach((btn) => {
          btn.addEventListener("click", () => {
            // remove active from all tabs
            tabs.forEach((b) => b.classList.remove("active"));
            // hide all panes
            Object.values(panes).forEach((p) => p.classList.remove("active"));
            // activate current
            btn.classList.add("active");
            const tabName = btn.getAttribute("data-tab");
            if (panes[tabName]) panes[tabName].classList.add("active");
          });
        });

        // SUBMIT / CANCEL LOGIC
        const submitBtn = document.getElementById("submitBtn");
        const cancelBtn = document.getElementById("cancelBtn");
        const statusMsg = document.getElementById("statusMsg");
        const textarea = document.getElementById("turnAction");

        let isSubmitted = false;

        // submit action
        submitBtn.addEventListener("click", () => {
          if (isSubmitted) return; // already submitted

          const actionText = textarea.value.trim();
          if (actionText === "") {
            statusMsg.textContent =
              "⚠️ Please describe your action before submitting.";
            return;
          }

          // set submitted state
          isSubmitted = true;
          statusMsg.textContent = "⏳ Waiting for other players...";
          submitBtn.disabled = true;
          cancelBtn.disabled = false; // allow cancel while waiting
          textarea.disabled = true;
          // Optional: visually dim the textarea but keep content
          textarea.style.opacity = "0.7";
        });

        // cancel submission
        cancelBtn.addEventListener("click", () => {
          if (!isSubmitted) return;

          // revert everything
          isSubmitted = false;
          statusMsg.textContent =
            "✅ Submission cancelled. You can edit and submit again.";
          submitBtn.disabled = false;
          cancelBtn.disabled = true;
          textarea.disabled = false;
          textarea.style.opacity = "1";
          // keep textarea content (player can modify)
        });

        // Initial state: cancel disabled, submit enabled
        cancelBtn.disabled = true;

        // Reset status when user types (if not submitted)
        textarea.addEventListener("input", () => {
          if (!isSubmitted) {
            statusMsg.textContent = "";
          }
        });

        // Prevent cancel if not submitted (just in case)
        // Also optional: if player cancels, we keep the text in textarea — that's fine.

        // additional: Pressing submit again is prevented by disabled state.
      })();
