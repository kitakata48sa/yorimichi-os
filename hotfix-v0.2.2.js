/* Yorimichi OS v0.2.2 JSON reader hotfix */
(() => {
  function parseJsonResponse(input) {
    let text = String(input || '').trim();
    if (!text) throw new Error('入力欄が空です');

    text = text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    try {
      return JSON.parse(text);
    } catch (_) {
      const objectStart = text.indexOf('{');
      const arrayStart = text.indexOf('[');
      const starts = [objectStart, arrayStart].filter(n => n >= 0);
      const objectEnd = text.lastIndexOf('}');
      const arrayEnd = text.lastIndexOf(']');
      const ends = [objectEnd, arrayEnd].filter(n => n >= 0);
      if (!starts.length || !ends.length) {
        throw new Error('JSONの開始位置または終了位置を特定できません');
      }
      const start = Math.min(...starts);
      const end = Math.max(...ends);
      if (end < start) throw new Error('JSONの範囲が不正です');
      return JSON.parse(text.slice(start, end + 1));
    }
  }

  function candidateArray(parsed) {
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.candidates)) return parsed.candidates;
    if (parsed && Array.isArray(parsed.results)) return parsed.results;
    if (parsed && parsed.result && Array.isArray(parsed.result.candidates)) {
      return parsed.result.candidates;
    }
    throw new Error('候補配列が見つかりません。candidates配列または配列形式で返してください');
  }

  const button = document.querySelector('#parseBtn');
  const input = document.querySelector('#responseIn');
  const list = document.querySelector('#resultList');
  if (!button || !input || !list) return;

  button.onclick = () => {
    try {
      const parsed = parseJsonResponse(input.value);
      const loaded = candidateArray(parsed).filter(x => x && typeof x === 'object');
      candidates = loaded;
      candidates.sort((a, b) => score(b) - score(a));
      renderResults();
      if (candidates.length) {
        toast(`${candidates.length}件の候補を読み込みました`);
      } else {
        list.innerHTML = '<div class="status warn">JSONは読み込めましたが、候補は0件でした。</div>';
        toast('候補は0件でした');
      }
    } catch (error) {
      list.innerHTML = `<div class="status warn"><b>JSON読込エラー</b><br>${String(error.message || error)}</div>`;
      toast(`JSON読込エラー: ${error.message || error}`);
    }
  };

  const badge = document.querySelector('.badge');
  if (badge && badge.textContent.includes('v0.2.0')) badge.textContent = 'v0.2.2';
})();
