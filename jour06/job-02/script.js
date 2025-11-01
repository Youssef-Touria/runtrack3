// jQuery + Bootstrap 5 requis (chargés via CDN dans index.html)

$(function () {
  // 2) Modal “papillon”
  const papillonModal = new bootstrap.Modal(document.getElementById('papillonModal'));
  $('#buy-butterfly').on('click', function (e) {
    e.preventDefault();
    papillonModal.show();
  });

  // 3) Rebooter => citation Blade Runner (1982)
  const quotes = [
    "All those moments will be lost in time, like tears in rain.",
    "More human than human is our motto.",
    "Quite an experience to live in fear, isn't it?",
    "I've seen things you people wouldn't believe.",
    "Wake up! Time to die."
  ];
  $('#btn-reboot').on('click', function () {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    $('#jumbotronTitle').text('Blade Runner');
    $('#jumbotronBody').text(q);
  });

  // 4) Pagination => change le jumbotron
  $('.pagination').on('click', '.page-link', function (e) {
    e.preventDefault();
    const content = $(this).data('content') || 'Contenu…';
    $('#jumbotronTitle').text(`Page ${$(this).text()}`);
    $('#jumbotronBody').text(content);
    $('.pagination .page-item').removeClass('active');
    $(this).closest('.page-item').addClass('active');
  });

  // 5) Liste groupée droite => actif
  $('#rightList').on('click', '.list-group-item', function () {
    $('#rightList .list-group-item').removeClass('active');
    $(this).addClass('active');
  });

  // 6) Progress bar +/- (10%)
  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function setProgress(val) {
    const v = clamp(val, 0, 100);
    $('#mainProgress')
      .attr('aria-valuenow', v)
      .css('width', v + '%')
      .text(v + '%');
  }
  $('#btn-progress-plus').on('click', function () {
    const cur = parseInt($('#mainProgress').attr('aria-valuenow') || '0', 10);
    setProgress(cur + 10);
  });
  $('#btn-progress-minus').on('click', function () {
    const cur = parseInt($('#mainProgress').attr('aria-valuenow') || '0', 10);
    setProgress(cur - 10);
  });

  // 7) Séquence clavier D, G, C => modal récap (#form-left)
  const recapModal = new bootstrap.Modal(document.getElementById('recapModal'));
  const seqTarget = ['d','g','c'];
  let buffer = [];
  $(document).on('keydown', function (e) {
    const key = (e.key || '').toLowerCase();
    if (!key || key.length !== 1) return;
    buffer.push(key);
    if (buffer.length > 3) buffer.shift();
    if (buffer.join('') === seqTarget.join('')) {
      const $list = $('#recapList').empty();
      $('#form-left').find('input, select, textarea').each(function () {
        const label = $(this).attr('name') || $(this).attr('id') || 'Champ';
        const val = $(this).val() || '(vide)';
        $('<li/>').html(`<strong>${label}:</strong> ${escapeHtml(val)}`).appendTo($list);
      });
      recapModal.show();
      buffer = [];
    }
  });

  // 8) Submit form droite => change couleur du spinner
  const colors = ['primary','secondary','success','danger','warning','info','dark'];
  $('#form-right').on('submit', function (e) {
    e.preventDefault();
    const email = $('#loginEmail').val().trim();
    const pass = $('#loginPassword').val().trim();
    if (!email || !pass || !isValidEmail(email)) {
      this.reportValidity?.();
      return;
    }
    const c = colors[Math.floor(Math.random() * colors.length)];
    const $sp = $('#mainSpinner');
    $sp.removeClass(colors.map(col => 'text-' + col).join(' '));
    $sp.addClass('text-' + c);
  });

  // Utils
  function isValidEmail(mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  }
  function escapeHtml(str) {
    return String(str)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'","&#39;");
  }
});
