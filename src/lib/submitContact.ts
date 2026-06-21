export type SubmitError = "not_configured" | "submit_failed";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: SubmitError };

export async function submitContactForm(
  form: HTMLFormElement,
): Promise<SubmitResult> {
  const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const formData = new FormData(form);

  if (web3formsKey) {
    if (!formData.get("access_key")) {
      formData.set("access_key", web3formsKey);
    }

    const res = await fetch(
      form.action || "https://api.web3forms.com/submit",
      { method: "POST", body: formData },
    );
    const json = (await res.json()) as { success?: boolean };
    if (json.success) return { ok: true };
    return { ok: false, error: "submit_failed" };
  }

  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        _subject: `devs-for-hire: заявка от ${formData.get("name")}`,
      }),
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: "submit_failed" };
  }

  return { ok: false, error: "not_configured" };
}
