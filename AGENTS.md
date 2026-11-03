<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site is Arabic RTL (`dir="rtl"` on html); use logical spacing (ms/me/ps/pe/start/end) so layouts mirror correctly.
- Shared page sections live in `src/components/site/Sections.tsx`; route files compose them to avoid duplication.
- PWA is manifest-only (no service worker) because offline support was not requested.
