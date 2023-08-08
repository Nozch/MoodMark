# ベースイメージとして公式の Node.js イメージを使用
FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.json と yarn.lock (もしあれば) をコンテナにコピー
COPY package.json yarn.lock ./

# 依存関係をインストール
RUN yarn install

# アプリケーションのソースコードをコンテナにコピー
COPY . .

# Next.js のビルドを実行
RUN yarn build

# アプリケーションを起動するコマンドを設定
CMD ["yarn", "start"]
