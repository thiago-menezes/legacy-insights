(function () {
  /**
   * Legacy Insights UTM Tracker
   * Captures UTM parameters and persists them for attribution.
   */
  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'xcod',
    'src',
    'sck',
  ];

  const captured = {};
  let hasData = false;

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      captured[key] = value;
      hasData = true;
    }
  });

  if (hasData) {
    const existing = JSON.parse(
      localStorage.getItem('legacy_insights_utm') || '{}',
    );
    const updated = {
      ...existing,
      ...captured,
      _last_update: new Date().toISOString(),
    };
    localStorage.setItem('legacy_insights_utm', JSON.stringify(updated));

    // Also store in session for immediate use
    sessionStorage.setItem('legacy_insights_utm', JSON.stringify(updated));

    console.log('[Legacy Insights] Tracking data updated');
  }

  // Auto-fill hidden form fields if they exist
  window.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(
      localStorage.getItem('legacy_insights_utm') || '{}',
    );
    utmKeys.forEach((key) => {
      if (data[key]) {
        const inputs = document.querySelectorAll(
          `input[name="${key}"], input[id="${key}"]`,
        );
        inputs.forEach((input) => {
          if (input.type === 'hidden' || !input.value) {
            input.value = data[key];
          }
        });
      }
    });
  });
})();
