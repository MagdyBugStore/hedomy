# hedomy — الفرونت (Next.js + TypeScript + Tailwind)

واجهة متجر هدومي (RTL). لا تتصل بقاعدة البيانات مباشرة؛ كل البيانات من [hedomy-api](https://github.com/MagdyBugStore/hedomy-api) عبر `/api` (rewrite في `next.config.ts`)، وكذلك `/images` و`/brand-logos`.

```bash
cp .env.example .env.local   # API_URL + مفاتيح Firebase العامة
npm install
npm run dev                  # http://localhost:3100  (يتطلب hedomy-api على 4100)
npm run build && npm start
```
الـ deploy: push على `main` ← webhook ← `deploy/deploy.sh` (pull + build + restart لخدمة `hedomy-web`).
المتغيرات `NEXT_PUBLIC_*` تُدمج وقت الـ build.

> Auto-deploy: push to `main` redeploys this service (webhook → deploy/deploy.sh).
