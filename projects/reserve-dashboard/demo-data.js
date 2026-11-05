// Fictional data for the public Reserve Dashboard demo. Nothing here comes from a real workbook:
// accounts, collectors and amounts are generated from a fixed seed, so every visitor sees the same numbers.
// The generator writes the same two CSV layouts the real loader reads, then runs them through processCsv()
// (Logic), so the demo exercises the real parsing and reserve math, not a shortcut.
(function () {
  var seed = 20261031;
  function rand() { // mulberry32
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  function between(a, b) { return a + rand() * (b - a); }
  function cents(x) { return Math.round(x * 100) / 100; }

  var periods = [];
  for (var k = 0; k < 12; k++) { var m = (10 + k) % 12 + 1, y = 2025 + Math.floor((10 + k) / 12); periods.push(('0' + m).slice(-2) + '-' + y); }
  var collectors = ['Collector A', 'Collector B', 'Collector C', 'Collector D', 'Collector E', 'Collector F', 'Collector G', 'Collector H'];

  var accounts = [];
  for (var i = 0; i < 640; i++) {
    var flows = periods.map(function () {
      var r = rand();
      if (r < 0.13) return cents(between(200, 26000));   // a balance rolls into 360+
      if (r < 0.18) return -cents(between(100, 15000));  // payment or credit memo
      return 0;
    });
    accounts.push({
      id: 'DEMO-' + (10400 + i * 7),
      vsl: rand() < 0.03 ? '' : collectors[Math.floor(rand() * collectors.length)],
      reserve: rand() < 0.42 ? cents(between(500, 62000)) : 0,
      flows: flows
    });
  }

  function q(v) { v = String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function line(cells) { return cells.map(q).join(',') + '\n'; }
  // A few amounts use Colombian formatting ("1.215,60"), as exports from es-CO machines do.
  function amount(x) {
    if (rand() < 0.1) { var p = Math.abs(x).toFixed(2).split('.'); return (x < 0 ? '-' : '') + p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + p[1]; }
    return x.toFixed(2);
  }

  // Monthly sheet: one row per invoice line; an account's month can hold several lines that net out.
  var general = line(['oracle_account_number', 'collections_vsl', 'Mont-Year 360+', 'Balance due']);
  accounts.forEach(function (a) {
    a.flows.forEach(function (f, p) {
      if (!f) return;
      var parts = rand() < 0.35 ? 2 : 1, left = f;
      for (var j = 0; j < parts; j++) {
        var piece = j === parts - 1 ? left : cents(f * between(0.3, 0.7));
        left = cents(left - piece);
        general += line([a.id, a.vsl, periods[p], amount(piece)]);
      }
    });
  });

  // Accumulated sheet: the period headers repeat in three blocks (inflows, running total, floored),
  // like the workbook. The floored block is what the dashboard checks its own math against.
  var head = ['Reserve'].concat(periods);
  var rolling = line(['oracle_account_number', 'collections_vsl'].concat(head, head, head));
  accounts.forEach(function (a) {
    var inflow = [a.reserve].concat(a.flows), run = 0, running = [], floored = [];
    inflow.forEach(function (x) { run = cents(run + x); running.push(run); floored.push(Math.max(run, 0)); });
    rolling += line([a.id, a.vsl].concat(inflow.map(amount), running.map(function (x) { return x.toFixed(2); }), floored.map(function (x) { return x.toFixed(2); })));
  });

  window.DEMO_CSV = { general: general, rolling: rolling };
  window.DEMO_DATA = {
    general: processCsv(general, 'general'),
    rolling: processCsv(rolling, 'rolling'),
    source: 'synthetic-reserve-sample (fictional)',
    updated: '2026-11-01T09:00:00Z'
  };
})();
