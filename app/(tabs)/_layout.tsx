import { CustomTabBar } from "@/components/CustomTabBar";
import { Tabs } from "expo-router";

/**
 * (tabs)/_layout.tsx
 *
 * Root tab navigator for the authenticated app shell.
 * Tabs: Home · Learn · AI Teacher · Chat · Profile
 *
 * Uses a fully custom tab bar (CustomTabBar) for the animated
 * active-circle design shown in the Figma spec.
 */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="learn" />
      <Tabs.Screen name="ai-teacher" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
