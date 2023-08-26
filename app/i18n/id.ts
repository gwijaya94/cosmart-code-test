import { Translations } from "./en"

const id: Translations = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    readyForLaunch: "Ready for launch.",
    postscript: "",
    exciting: "",
  },

  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.json`) and probably the layout as well (`app/screens/error`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    traceTitle: "Error from %{name} stack",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default id
