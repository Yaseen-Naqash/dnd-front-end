(function () {
  // Get all message elements inside the chat container
  const chatContainer = document.getElementById("chatMessages");
  const messages = chatContainer.querySelectorAll(".message");

  // Modal elements
  const modalOverlay = document.getElementById("modalOverlay");
  const modalSender = document.getElementById("modalSender");
  const modalContent = document.getElementById("modalContent");
  const closeModalBtn = document.getElementById("closeModalBtn");

  // ---------- helper: build sender HTML for modal (similar to original but larger) ----------
  function buildSenderHTML(messageElement) {
    const originalSender = messageElement.querySelector(".sender");
    if (!originalSender) return "<span>?</span>";

    // Clone the sender node to avoid moving original
    const clonedSender = originalSender.cloneNode(true);

    // Remove any <h6> badge? No, keep but we'll adjust classes if needed.
    // But we want consistent look: keep original badges but we will style them via modal-badge class maybe.
    // Instead of replacing, we'll extract inner HTML and wrap with modal-specific styles.
    // However we want the same text/emoji, but with classes that look good in modal.

    // We'll rebuild from children of originalSender.
    const senderChildren = originalSender.children;
    let senderHTML = "";

    // Use original sender's inner structure but with modal classes.
    // But we can simply copy innerHTML and then replace badge classes with modal-badge
    // For simplicity and to keep original badges text, we'll do string replacement on the outerHTML.
    // Actually easiest: clone, then modify classes.
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(clonedSender);

    // Replace all badges with modal-badge class (keep any extra classes like dm-badge? not necessary)
    // But careful: we want to preserve the original text and structure.
    // We'll find .badge elements and replace class.
    const badges = tempDiv.querySelectorAll(".badge");
    badges.forEach((badge) => {
      // keep any additional classes? we want consistent modal-badge style.
      // But we want to preserve if it's h6. We'll keep tag but change class.
      const oldClass = badge.className;
      // Use modal-badge plus optional extra classes (like 'dm-badge' if we detect parent .dm)
      // We'll add 'modal-badge' and keep any additional class that might be useful.
      badge.className = "modal-badge";
      // If parent message is DM, add a special class for styling
      if (messageElement.classList.contains("dm")) {
        badge.classList.add("dm-badge");
      }
    });

    // Also we might want to replace any h3/h6 with same tags but they look fine.
    // Just ensure no conflicting styles: we'll set font size in modal-sender via CSS.
    // The modal-sender children may be h3/h6/span etc.
    // We'll keep them but the CSS for .modal-sender will handle size.

    return tempDiv.innerHTML;
  }

  // ---------- open modal with message data ----------
  function openModalForMessage(messageElement) {
    // Extract content
    const contentDiv = messageElement.querySelector(".content");
    const contentText = contentDiv ? contentDiv.innerText : "— no content —";

    // Build sender HTML (clone & restyle badges)
    const senderHTML = buildSenderHTML(messageElement);

    // Set modal sender and content
    modalSender.innerHTML = senderHTML;
    modalContent.innerText = contentText; // use innerText for plain text, preserves line breaks?
    // innerText will collapse some spaces but okay; better use textContent?
    // For Persian text, innerText works fine. But we might have multiple lines; innerText preserves.
    // However innerText may trim leading/trailing. It's fine.
    // Alternative: use textContent to preserve exact, but innerText respects display.
    // Since content is plain text, innerText is fine.

    // Add active class to overlay
    modalOverlay.classList.add("active");
    document.body.classList.add("modal-open");
  }

  // ---------- close modal ----------
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
    // clear content after close? optional, but avoid flicker.
    // We'll clear after transition, but not necessary.
    // For performance, we can leave it.
  }

  // ---------- attach click handlers to each message ----------
  messages.forEach((msg) => {
    // add a hint: cursor pointer is already set, but also data attribute for testing
    msg.setAttribute("data-clickable", "true");
    msg.addEventListener("click", (e) => {
      // Prevent if click originated from modal? no, we're in message context.
      // Also prevent if user clicked on a child that might be interactive? none.
      openModalForMessage(msg);
    });
    // Optional: keyboard accessibility
    msg.setAttribute("tabindex", "0");
    msg.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModalForMessage(msg);
      }
    });
  });

  // ---------- close modal on button click ----------
  closeModalBtn.addEventListener("click", closeModal);

  // ---------- close modal when clicking on overlay background (not on card) ----------
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ---------- close modal with Escape key ----------
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // make sure close button doesn't trigger overlay click (it won't because it's inside card)
  // also prevent clicks inside modal card from closing (they won't because we check target === overlay)
})();



// scroll to bottom in history
window.addEventListener('load', () => {
  const el = document.querySelector('.chat-messages');
  el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
});



// slider
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('rightbarTrack');
    const options = document.querySelectorAll('.actionbar .options');

    // maps each actionbar button to its panel index
    // order MUST match your HTML panels
    // [0]=تاریخچه [1]=روایت [2]=نوبت [3]=بازیکنان
    // [4]=حماسه  [5]=رکوردها [6]=اتاق

    let currentIndex = 0;

    function goTo(index) {
        if (index < 0 || index >= options.length) return;
        currentIndex = index;

        // slide: move track left by (index * 100%)
        track.style.transform = `translateX(-${index * 100}%)`;

        // update active state
        options.forEach(o => o.classList.remove('active'));
        options[index].classList.add('active');

        // hide the grid overflow from the parent (prevents page x-scroll)
        // done via .rightbar { overflow: hidden } above
    }

    // attach click handlers
    options.forEach((opt, i) => {
        opt.addEventListener('click', () => goTo(i));
    });

    // default active = تاریخچه (index 0)
    goTo(0);
});
