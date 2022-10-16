# static-docs-with-hashed-dirname

静的なドキュメントファイルをGitHub Pages上で公開しつつ、ハッシュ値を用いたディレクトリで疑似的にパスワード認証っぽいものを実現する

----
## 作成した背景

1. 講義資料等に、html単体で作成されたドキュメントを使用している。
2. その講義資料をiPadで開き、手書きにてさらに情報を書き込みたい。
3. 手書きデータ込みでPDF形式にて保存したい。

上記作業が行える条件として、iPad標準ブラウザのSafariを使用する必要がある点と、インターネット上にHTML単体ドキュメントが公開されていないとSafariで開けないという問題があった。

解決策として、ドキュメントをGitHub Pagesで公開する方法を取ることにした。
ドキュメントの内容は大々的に公表するようなものではない。が閲覧者は絞り込みたい。（個人情報等の公開するとまずい情報は入っていないものとする）
という要望があり、ディレクトリ名を特定の名称からハッシュ値を算出して付けることにした。

参考にしたリポジトリは以下の2つで、どちらもネットで検索して辿り着いたもの。

- [matteobrusa/Password-protection-for-static-pages: Password protection for static pages](https://github.com/matteobrusa/Password-protection-for-static-pages)
- [chrissy-dev/protected-github-pages: Password protected GitHub pages](https://github.com/chrissy-dev/protected-github-pages)


## デモ

パスワード: demo

<a href="https://nagatani.github.io/static-docs-with-hashed-dirname/" target="_blank">https://nagatani.github.io/static-docs-with-hashed-dirname/</a>

## 必要環境

node.jsによるスクリプトが含まれるので、node.jsが必要。

```bash
# 開発時点の環境
$ node -v
v16.15.1
```

パスワードのハッシュ値生成には、以下の暗号化ライブラリを使用している。

- [Caligatio/jsSHA: A JavaScript/TypeScript implementation of the complete Secure Hash Standard (SHA) family (SHA-1, SHA-224/256/384/512, SHA3-224/256/384/512, SHAKE128/256, cSHAKE128/256, and KMAC128/256) with HMAC.](https://github.com/Caligatio/jsSHA)
  - `dist/sha3.mjs`をindex.htmlと同一階層に配置

## 使い方

### テンプレートからリポジトリを作成

下記画像を参考にこのテンプレートからリポジトリを作成する。

![new-repo](https://user-images.githubusercontent.com/696573/196020561-c4d399fa-3707-40a5-b6b0-673be2b07915.png)

プライベートリポジトリにしておかないと意味がないので注意。

### サイト公開フロー

1. `gh-pages`ブランチに切り替える<br>（デモ用のディレクトリが残っている場合は削除する）
2. `$node create-dir.mjs [パスワード]` でハッシュ値のディレクトリ名を生成する
3. 必要なファイルを新規作成したディレクトリに格納<br>（この時、HTMLドキュメントのmetaタグに`<meta name="robots" content="noindex, nofollow, noarchive">`が入っていると良い）
4. `$node create-index.mjs [パスワード]` でディレクトリ内のファイルリストをindex.htmlとして生成
5. `gh-pages`ブランチへpush

