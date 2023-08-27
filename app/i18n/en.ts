const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
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

  component: {
    modalInfo: {
      closeButton: "Close",
    },
    orderItem: {
      orderNo: "Order No: {{orderNo}}",
      pickupDate: "Pickup Date: {{date}}",
      booksBorrowed: "Books Borrowed: {{borrowedLength}}",
      checkDetail: "Check Detail",
    },
  },

  homeScreen: {
    searchPlaceholder: "Search {{search}}...",
    availSubject: "Subjects :",
    authorName: "Author(s) : {{authors}}",
    editionNumber: "Edition : {{edition}}",
    noBook: "No Book Result Found",
    borrowButton: "Borrow",
    cancelButton: "Cancel",
  },
  summaryScreen: {
    borrowedBooks: "Borrowed book(s):",
    submit: "Submit",
    pickupDate: "Pickup Date",
    edit: "Edit",
    cancel: "Cancel",
    delete: "Delete",
  },
}

export default en
export type Translations = typeof en
