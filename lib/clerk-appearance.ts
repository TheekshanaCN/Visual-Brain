import { dark } from "@clerk/themes";

export const getClerkAppearance = (isDark: boolean) => ({
  baseTheme: isDark ? dark : undefined,

  variables: {
    colorPrimary: isDark ? "#D4B999" : "#C9B59C",
    colorBackground: isDark ? "#24211E" : "#FFFFFF",
    colorText: isDark ? "#E8E4DF" : "#4A4338",
    colorInputBackground: isDark ? "#2C2926" : "#F8F4EF",
    colorInputText: isDark ? "#E8E4DF" : "#4A4338",
    colorDanger: "#D55C5C",

    borderRadius: "12px",
    fontSize: "15px",
  },

  elements: {
    // ------ HEADER ------
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
  },
});
