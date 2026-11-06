import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { inputClasses } from "@/components/ui/formStyles";
import { PROMO } from "@/utils/constants";

interface PromoCodeFormProps {
  onApply: (code: string) => boolean; // returns false for an invalid code
}

export function PromoCodeForm({ onApply }: PromoCodeFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onApply(code)) {
      setCode("");
      setError(null);
    } else {
      setError("Invalid promo code");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="promo-code" className="mb-1.5 block text-sm font-semibold">
        Promo code
      </label>
      <div className="flex gap-2">
        <input
          id="promo-code"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(null);
          }}
          placeholder="Enter code"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "promo-code-error" : "promo-code-hint"}
          className={inputClasses(Boolean(error), "uppercase placeholder:normal-case")}
        />
        <Button type="submit" variant="secondary" disabled={code.trim() === ""}>
          Apply
        </Button>
      </div>
      {error ? (
        <p id="promo-code-error" className="mt-1 text-sm text-out dark:text-red-400">
          {error}
        </p>
      ) : (
        // Demo shop: the only code is shown openly, so testers do not have to guess it
        <p id="promo-code-hint" className="mt-1 text-xs text-ink-500 dark:text-ink-400">
          Try <span className="font-semibold">{PROMO.code}</span> for {PROMO.percent}% off.
        </p>
      )}
    </form>
  );
}
