# 変更履歴

## v0.1.2 - 2026-08-30

- Googleマップで緯度経度ピンではなく店舗・施設の詳細を優先して開くよう改善
- `google_maps_place_url` と `google_place_id` に対応
- 旧形式のJSONでも店舗名と住所からGoogle Maps検索URLを自動生成
- 座標のみのURLを調査結果として返さない指示を追加
- 位置情報エラーを日本語化し、拒否・取得不能・タイムアウトを区別
- Web App ManifestをHTMLから参照
- バージョン表示を追加
- NetlifyとGitHub向けファイルを整理

## v0.1.1 - 2026-08-23

- JavaScript無効時の警告を追加
- Clipboard API非対応時のコピー代替処理を追加
- PWA用manifestとNetlify設定を追加

## v0.1.0 - 2026-08-23

- 初期MVP
