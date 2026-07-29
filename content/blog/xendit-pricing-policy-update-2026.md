---
title: "Update Xendit Pricing Policy 2026: Biaya Baru yang Perlu Lo Tahu"
source_url: "https://help.xendit.co/hc/en-us/articles/59516240127129-Xendit-Pricing-Policy"
tags: ["xendit", "payment-gateway", "pricing", "fintech", "indonesia", "e-commerce"]
date: "2026-07-29T09:18:00.000Z"
cover_image: "/xendit-pricing-policy-2026.png"
---

Kalau lo pakai Xendit sebagai payment gateway bisnis online lo, ada update pricing policy yang perlu lo tahu ASAP.

Xendit baru aja announce perubahan pricing yang bakal efektif mulai Agustus sampai Desember 2026. Ada beberapa fee baru yang ditambahin, dan beberapa yang direvisi.

Gue breakdown semuanya biar lo nggak kaget pas liat billing bulan depan.

## Timeline Update: Kapan Mulai Berlaku?

Ini bukan satu perubahan besar di satu waktu. Xendit rolling out perubahan ini secara bertahap:

**1 Agustus 2026**
- Revisi transaction fee untuk semua payment method

**1 Oktober 2026**
- **Xendit Processing Fee** (fee baru!)
- **Refund fee** (sekarang kena charge tambahan)
- **Chargeback fee** (USD 25 per dispute)
- **Monthly Minimum Fee** (USD 50 untuk dormant account)
- **Monthly Maintenance Fee** (USD 250 untuk legacy API)

**1 Desember 2026**
- **Shopify Partner Fee** (0.50% untuk merchant yang pakai Shopify)

## Xendit Processing Fee: Fee Baru yang Paling Impact

Ini yang paling besar: mulai 1 Oktober 2026, **setiap transaksi** bakal kena Xendit Processing Fee.

Nggak peduli payment method-nya apa. Nggak peduli transaksinya sukses atau gagal.

### Berapa Biayanya untuk Indonesia?

Untuk market Indonesia, Xendit Processing Fee-nya adalah **IDR 4,000 per transaksi**.

Jadi sekarang struktur biaya lo jadi:

**Payment Method Fee + Xendit Processing Fee**

Contoh kalau customer bayar pakai BCA Virtual Account:
- Payment method fee: IDR 9,000
- Xendit Processing Fee: IDR 4,000
- **Total biaya: IDR 13,000**

Contoh kalau pakai QRIS:
- Payment method fee: 0.7% (misalnya transaksi Rp 100,000 = Rp 700)
- Xendit Processing Fee: IDR 4,000
- **Total biaya: IDR 4,700**

### Processing Fee Kena Juga ke Failed Transaction

Ini yang perlu lo perhatiin banget.

Processing fee ini berlaku ke **semua attempt transaksi**, termasuk yang gagal.

Customer coba bayar pakai kartu kredit tapi declined? Lo tetap kena processing fee.

API call gagal karena timeout? Processing fee tetap jalan.

Kenapa? Karena dari sisi Xendit, mereka tetap process request lo, walaupun hasilnya gagal.

### Cara Ngurangin Biaya dari Failed Transaction

Kalau lo mau minimize kerugian dari failed transaction, lo bisa:

1. **Improve authorization rate** - pastikan payment flow lo smooth
2. **Better validation** - check dulu sebelum hit payment gateway
3. **Retry logic yang smart** - jangan spam retry kalau customer balance-nya emang nggak cukup
4. **Educate customer** - kasih instruksi yang jelas biar nggak banyak error

## Refund Fee: Sekarang Kena Charge Tambahan

Dulu kalau lo refund transaksi, lo cuma kehilangan payment method fee.

Mulai 1 Oktober 2026, **refund juga kena Xendit Processing Fee tambahan**.

Dan yang perlu lo tahu: **fee dari transaksi original nggak dikembaliin**.

### Contoh Perhitungan Refund

Customer beli produk Rp 500,000 pakai Virtual Account BCA:
- Biaya transaksi original: IDR 9,000 (method) + IDR 4,000 (processing) = IDR 13,000

Customer minta refund:
- Refund fee: IDR 4,000 (processing fee untuk proses refund)
- Fee original yang nggak dikembaliin: IDR 13,000

**Total kerugian lo dari refund: IDR 17,000**

Plus lo kehilangan transaksi Rp 500,000-nya.

Jadi sekarang refund policy bisnis lo perlu lebih ketat. Atau lo bisa pass sebagian cost ini ke customer dengan refund policy yang lebih clear.

## Monthly Minimum Fee: Dormant Account Kena Charge

Mulai 1 Oktober 2026, kalau account lo **nggak ada transaksi selama 180 hari**, lo bakal kena Monthly Minimum Fee **USD 50** (atau ekuivalen dalam mata uang lokal).

Atau kalau total invoice lo dalam sebulan kurang dari USD 50 (excluding chargeback fee), lo tetap bayar USD 50.

### Siapa yang Kena?

- Account yang udah go-live tapi nggak ada transaksi 6 bulan
- Account yang ada transaksi tapi total fee-nya belum nyampe USD 50/bulan

### Cara Avoid Fee Ini

Simple: **close account yang nggak dipake**.

Kalau lo punya multiple Xendit account untuk testing atau project yang udah dead, tutup aja sebelum October 2026.

## Monthly Maintenance Fee: Legacy API Users Wajib Migrate

Kalau bisnis lo masih pakai **legacy API** Xendit, lo bakal kena Monthly Maintenance Fee **USD 250** mulai 1 Oktober 2026.

### Cara Cek Apakah Lo Masih Pakai Legacy API

Ada dua cara:

**1. Tanya developer lo**
Cek apakah integration lo masih hit legacy API endpoints di `archive.developers.xendit.co/api-reference/`

**2. Check Payment ID**
Export Transactions Report dari Xendit Dashboard, include kolom "Payment ID":
- Kalau Payment ID-nya pakai prefix **"py-"** = latest API ✅
- Kalau prefix-nya beda = legacy API ❌

### Cara Avoid Fee Ini

Migrate ke [latest Payments and Payouts API](https://docs.xendit.co/docs/payments-via-api-overview).

Xendit strongly recommend ini, dan developer yang experienced seharusnya bisa migrate dalam beberapa hari.

## Chargeback Fee: USD 25 per Dispute

Kalau customer dispute transaksi kartu kredit lewat bank mereka, lo bakal kena **Chargeback Dispute Fee USD 25**.

Ini cover administrative dan operational cost Xendit untuk manage dispute.

Fee ini terpisah dari disputed transaction amount.

Jadi kalau customer chargeback transaksi Rp 1,000,000:
- Lo kehilangan Rp 1,000,000
- Plus bayar USD 25 (~Rp 400,000) chargeback fee

### Cara Minimize Chargeback

- **Clear product description** - customer tahu apa yang mereka beli
- **Fast shipping** - jangan biarkan customer impatient
- **Good customer service** - resolve issue sebelum mereka chargeback
- **Proper documentation** - simpan bukti delivery, komunikasi, dll

## Shopify Integration Fee: 0.50% Starting Dec 2026

Kalau lo integrate Xendit lewat Shopify, ada **Shopify Partner Fee 0.50%** dari total transaction volume yang bakal efektif mulai 1 Desember 2026.

Ini berlaku **per transaction**.

Jadi kalau transaksi lo Rp 1,000,000:
- Shopify Partner Fee: Rp 5,000
- Plus payment method fee + processing fee

Fee ini reflect cost dari integrated ecosystem yang Xendit provide lewat third-party platform.

## Pricing Lengkap untuk Indonesia Market

Setelah semua update berlaku (Oktober 2026), ini struktur biaya lengkap untuk beberapa payment method populer di Indonesia:

### Virtual Account (BCA, BNI, BRI, Mandiri, dll)
- Payment method fee: **IDR 9,000**
- Processing fee: **IDR 4,000**
- **Total: IDR 13,000 per transaksi**

### QRIS
- Payment method fee: **0.70%** (inclusive of VAT)
- Processing fee: **IDR 4,000**
- **Total: 0.70% + IDR 4,000**

### Credit/Debit Card (Domestic Visa/Mastercard/JCB)
- Payment method fee: **2.90% + IDR 2,000**
- Processing fee: **IDR 4,000**
- **Total: 2.90% + IDR 6,000**

### Credit Card (AMEX)
- Payment method fee: **3.90% + IDR 2,000**
- Processing fee: **IDR 4,000**
- **Total: 3.90% + IDR 6,000**

### E-Wallet (OVO - Indonesia Non-Digital Merchants)
- Payment method fee: **3.00%**
- Processing fee: **IDR 4,000**
- **Total: 3.00% + IDR 4,000**

### E-Wallet (GoPay)
- Payment method fee: **3.00%**
- Processing fee: **IDR 4,000**
- **Total: 3.00% + IDR 4,000**

### E-Wallet (DANA - E-wallet)
- Payment method fee: **3.00%**
- Processing fee: **IDR 4,000**
- **Total: 3.00% + IDR 4,000**

### E-Wallet (ShopeePay)
- Payment method fee: **3.00%**
- Processing fee: **IDR 4,000**
- **Total: 3.00% + IDR 4,000**

### Retail Outlet (Alfamart / Indomaret)
- Payment method fee: **IDR 9,000**
- Processing fee: **IDR 4,000**
- **Total: IDR 13,000 per transaksi**

## Perbandingan dengan Kompetitor

Kalau lo compare dengan payment gateway lain di Indonesia:

**Midtrans (Gojek)**
- Virtual Account: ~IDR 4,000 per transaksi
- QRIS: 0.7%
- Cards: 2.9% + IDR 2,000
- Nggak ada "processing fee" terpisah (belum announce)

**Doku**
- Virtual Account: ~IDR 4,000 per transaksi
- QRIS: 0.7%
- Cards: ~2.9%

Xendit sekarang **jadi lebih mahal** dengan addition of processing fee IDR 4,000 di semua transaksi.

Tapi lo juga dapet:
- Support multi-country (HK, SG, PH, MY, TH, VN)
- API documentation yang lebih lengkap
- Better developer experience (subjektif)

## Action Items: Apa yang Harus Lo Lakuin Sekarang?

### Before 1 August 2026
- ✅ Review pricing page update
- ✅ Calculate dampak ke profit margin lo

### Before 1 October 2026
- ✅ **Migrate dari legacy API** (kalau masih pakai) biar avoid USD 250/month
- ✅ **Close dormant accounts** biar avoid USD 50/month
- ✅ **Update refund policy** di website lo
- ✅ **Educate customer** tentang payment best practices
- ✅ **Optimize payment flow** buat reduce failed transaction

### Before 1 December 2026 (Shopify users only)
- ✅ Calculate impact dari 0.50% partner fee
- ✅ Consider alternative kalau margin lo ketat

## Kalau Lo Nggak Setuju dengan Pricing Baru?

Xendit bilang: kalau lo nggak agree dengan updated pricing, lo bisa:

1. **Make changes** ke Xendit service lo
2. **Terminate account** sebelum effective date

Contact support di **help@xendit.co** kalau lo mau discuss atau close account.

## Kesimpulan

Update pricing Xendit 2026 ini cukup significant, especially dengan introduction of **Xendit Processing Fee IDR 4,000** yang applies ke semua transaksi.

Untuk bisnis dengan high volume low-value transaction, ini bisa impact margin lo cukup besar.

Virtual Account yang dulu cuma IDR 9,000 sekarang jadi IDR 13,000 (naik 44%).

QRIS tetap competitive (0.7% + IDR 4,000), tapi untuk transaksi kecil bisa kerasa.

**Yang paling penting:**
- Migrate dari legacy API kalau lo masih pakai
- Close dormant account
- Optimize untuk reduce failed transaction
- Update refund policy lo

Dan kalau lo mau compare atau consider switch ke payment gateway lain, sekarang waktu yang tepat buat evaluate.

Xendit masih solid untuk cross-border payment dan developer experience, tapi sekarang lo bayar premium buat itu. 😈

---

**Disclaimer:** Pricing info ini based on Xendit official announcement per July 2026. Always check [Xendit official pricing page](https://www.xendit.co/en-id/pricing/) untuk detail terbaru dan akurat.
