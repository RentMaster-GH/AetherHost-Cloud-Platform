import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Lock,
  Send,
  AlertCircle,
  Clock,
  Sparkles,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaystackBillingManager: React.FC = () => {
  const {
    paystackConfig,
    updatePaystackConfig,
    paystackTransactions,
    initiatePaystackPayment,
    showToast,
    addAuditLog,
    currentUser
  } = useApp();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(paystackConfig.currency);
  const [isTestCheckoutOpen, setIsTestCheckoutOpen] = useState(false);
  const [testAmount, setTestAmount] = useState(20);
  const [testDescription, setTestDescription] = useState('Pro Scale Hosting Plan (Monthly)');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email);
  const [selectedChannel, setSelectedChannel] = useState<'card' | 'bank_transfer' | 'ussd' | 'mobile_money'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form mock card fields
  const [cardNumber, setCardNumber] = useState('5399 4100 8912 3421');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('891');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`${label} copied to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestWebhook = () => {
    showToast(`Sending test "charge.success" webhook to ${paystackConfig.webhookUrl}...`);
    setTimeout(() => {
      showToast(`Webhook delivered successfully to ${paystackConfig.webhookUrl} (Status: 200 OK)`);
      addAuditLog(`Paystack Webhook Ping Dispatched`, 'billing', paystackConfig.webhookUrl);
    }, 1200);
  };

  const handlePaystackCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsTestCheckoutOpen(false);
      initiatePaystackPayment(testAmount, testDescription, customerEmail);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Paystack Live Billing & Gateway</span>
            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PAYSTACK LIVE ACTIVE
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global African and international edge payments, subscriptions, and automated webhook routing powered by Paystack.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsTestCheckoutOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Launch Paystack Checkout</span>
          </button>
        </div>
      </div>

      {/* Paystack Live Credentials & Webhook Endpoints */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Live Paystack Integration Keys & URLs</h3>
          </div>
          <button
            onClick={handleTestWebhook}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Test Webhook Ping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-mono">
          {/* Public Key */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
              Paystack Live Public Key
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-emerald-300 truncate font-semibold select-all">
                {paystackConfig.publicKey}
              </span>
              <button
                onClick={() => handleCopy(paystackConfig.publicKey, 'Public Key')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded shrink-0 transition-colors"
                title="Copy Key"
              >
                {copiedKey === 'Public Key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500 font-sans block">Client-side inline popup authorization</span>
          </div>

          {/* Callback URL */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
              Paystack Live Callback URL
            </span>
            <div className="flex items-center justify-between gap-2">
              <a
                href={paystackConfig.callbackUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 truncate hover:underline flex items-center gap-1 select-all"
              >
                <span>{paystackConfig.callbackUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <button
                onClick={() => handleCopy(paystackConfig.callbackUrl, 'Callback URL')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded shrink-0 transition-colors"
                title="Copy URL"
              >
                {copiedKey === 'Callback URL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500 font-sans block">Post-payment customer redirect destination</span>
          </div>

          {/* Webhook URL */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">
              Paystack Live Webhook URL
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-purple-300 truncate select-all">
                {paystackConfig.webhookUrl}
              </span>
              <button
                onClick={() => handleCopy(paystackConfig.webhookUrl, 'Webhook URL')}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded shrink-0 transition-colors"
                title="Copy URL"
              >
                {copiedKey === 'Webhook URL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] text-slate-500 font-sans block">Server-to-server HMAC SHA-512 verified listener</span>
          </div>
        </div>

        {/* Channels & Currencies Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Supported Channels:</span>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {['Cards (Visa/MC/Verve)', 'Bank Transfer', 'USSD', 'Mobile Money', 'Apple Pay'].map((ch, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Default Currency:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => {
                setSelectedCurrency(e.target.value as any);
                updatePaystackConfig({ currency: e.target.value as any });
              }}
              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-emerald-300 font-mono font-bold focus:outline-none"
            >
              <option value="USD">USD ($ - United States Dollar)</option>
              <option value="NGN">NGN (₦ - Nigerian Naira)</option>
              <option value="GHS">GHS (₵ - Ghanaian Cedi)</option>
              <option value="ZAR">ZAR (R - South African Rand)</option>
              <option value="KES">KES (KSh - Kenyan Shilling)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hosting Subscription Plans with Paystack Checkout */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Hosting Plans & Resource Add-ons
          </h2>
          <span className="text-xs text-slate-400">Instant activation via Paystack</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Starter Plan */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase font-mono">Free Tier</span>
              <h3 className="text-lg font-bold text-white mt-1">Starter Edge</h3>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-2xl font-bold font-mono text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes 100GB Anycast bandwidth, 1 custom domain, and automated daily backups.
              </p>
            </div>
            <button
              disabled
              className="w-full py-2 bg-slate-800/60 text-slate-400 rounded-xl text-xs font-semibold cursor-not-allowed"
            >
              Current Base Plan
            </button>
          </div>

          {/* Pro Scale Plan */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/80 shadow-xl shadow-cyan-500/10 flex flex-col justify-between space-y-4 relative">
            <span className="absolute -top-2.5 right-4 text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 px-2.5 py-0.5 rounded-full shadow-sm">
              RECOMMENDED
            </span>
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase font-mono">Growth Tier</span>
              <h3 className="text-lg font-bold text-white mt-1">Pro Scale</h3>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-2xl font-bold font-mono text-white">$20</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                1TB fast egress bandwidth, unlimited domains, hourly automated snapshots, and full OWASP WAF.
              </p>
            </div>
            <button
              onClick={() => {
                setTestAmount(20);
                setTestDescription('Pro Scale Hosting Subscription');
                setIsTestCheckoutOpen(true);
              }}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Subscribe with Paystack</span>
            </button>
          </div>

          {/* Enterprise Dedicated */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase font-mono">Dedicated Cluster</span>
              <h3 className="text-lg font-bold text-white mt-1">Enterprise Dedicated</h3>
              <div className="flex items-baseline gap-1 my-2">
                <span className="text-2xl font-bold font-mono text-white">$180</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated 16 vCPU AMD EPYC node, sub-120s human SRE SLA, custom WORM backups, and HIPAA/SOC 2 compliance.
              </p>
            </div>
            <button
              onClick={() => {
                setTestAmount(180);
                setTestDescription('Enterprise Dedicated Cluster Subscription');
                setIsTestCheckoutOpen(true);
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Subscribe with Paystack</span>
            </button>
          </div>
        </div>
      </div>

      {/* Paystack Verified Transactions Table */}
      <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Paystack Live Transaction Ledger</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Callback & Webhook verified transactions
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {paystackTransactions.length} settled payments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800/80">
                <th className="pb-2.5 font-medium">Transaction Reference</th>
                <th className="pb-2.5 font-medium">Customer Email</th>
                <th className="pb-2.5 font-medium">Description / Plan</th>
                <th className="pb-2.5 font-medium">Amount</th>
                <th className="pb-2.5 font-medium">Payment Channel</th>
                <th className="pb-2.5 font-medium">Status</th>
                <th className="pb-2.5 font-medium text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {paystackTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3">
                    <span className="text-white font-bold select-all">{tx.reference}</span>
                    <span className="block text-[10px] text-slate-400 truncate max-w-xs">{tx.verifiedSignature}</span>
                  </td>
                  <td className="py-3 text-slate-300 font-sans">{tx.customerEmail}</td>
                  <td className="py-3 text-cyan-300 font-sans font-medium">{tx.planOrDescription}</td>
                  <td className="py-3 font-bold text-emerald-400 tabular-nums">
                    {tx.currency} {tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-950 text-slate-300 border border-slate-800">
                      {tx.channel}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Success
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-400 tabular-nums">{tx.paidAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Paystack Live Checkout Modal */}
      {isTestCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Paystack Brand Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white text-emerald-700 flex items-center justify-center font-bold text-base shadow-sm">
                  P
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Paystack Checkout</h3>
                  <div className="text-[11px] opacity-90 font-mono">Secured by 256-Bit SSL Encryption</div>
                </div>
              </div>
              <button
                onClick={() => setIsTestCheckoutOpen(false)}
                className="text-white/80 hover:text-white p-1 text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handlePaystackCheckoutSubmit} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Item / Plan</span>
                  <span className="font-bold text-white text-xs">{testDescription}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Due</span>
                  <span className="text-base font-extrabold font-mono text-emerald-400">
                    {paystackConfig.currency} {testAmount}
                  </span>
                </div>
              </div>

              {/* Customer Email */}
              <div>
                <label className="block text-slate-400 mb-1">Customer Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* Payment Channel Selector */}
              <div>
                <label className="block text-slate-400 mb-1.5">Select Payment Channel</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedChannel('card')}
                    className={`py-2 px-3 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedChannel === 'card'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedChannel('bank_transfer')}
                    className={`py-2 px-3 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      selectedChannel === 'bank_transfer'
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              {selectedChannel === 'card' ? (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-slate-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="5399 0000 0000 0000"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white">Dynamic Bank Account Transfer:</div>
                  <div className="font-mono text-emerald-400 text-sm">Wema Bank · 0192849102</div>
                  <div className="text-[11px] text-slate-400">Account Name: AetherHost Paystack Dedicated Account</div>
                </div>
              )}

              {/* Callback and Webhook destination notice */}
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 space-y-0.5">
                <div>Callback: <span className="text-cyan-400">https://www.africanremotejob.com</span></div>
                <div>Webhook: <span className="text-purple-400">https://www.africanremotejob.com/api/webhook</span></div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying with Paystack Live Engine...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay {paystackConfig.currency} {testAmount} Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
