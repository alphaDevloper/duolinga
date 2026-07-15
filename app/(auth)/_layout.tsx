import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Don't render until Clerk session is known
  if (!isLoaded) {
    return null;
  }

  // Already signed in — send to home
  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}
