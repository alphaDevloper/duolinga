import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ── Tab configuration ──────────────────────────────────────────────────────
type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIG: TabConfig[] = [
  {
    name: "index",
    label: "Home",
    icon: "home-outline",
    iconActive: "home",
  },
  {
    name: "learn",
    label: "Learn",
    icon: "book-outline",
    iconActive: "book",
  },
  {
    name: "ai-teacher",
    label: "AI Teacher",
    icon: "sparkles-outline",
    iconActive: "sparkles",
  },
  {
    name: "chat",
    label: "Chat",
    icon: "chatbubble-outline",
    iconActive: "chatbubble",
  },
  {
    name: "profile",
    label: "Profile",
    icon: "person-outline",
    iconActive: "person",
  },
];

const TAB_COUNT = TAB_CONFIG.length;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;

// Active circle dimensions
const CIRCLE_SIZE = 50;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  // Add 8 px extra so the bar never touches the system nav buttons
  const bottomPad = (insets.bottom > 0 ? insets.bottom : 12) + 8;

  // Centre offset: puts circle in the middle of each tab slot
  const centreOffset = TAB_WIDTH / 2 - CIRCLE_SIZE / 2;

  // Animated translateX — tracks (tabIndex * TAB_WIDTH) + centreOffset
  const circleX = useRef(
    new Animated.Value(state.index * TAB_WIDTH + centreOffset),
  ).current;

  useEffect(() => {
    Animated.spring(circleX, {
      toValue: state.index * TAB_WIDTH + centreOffset,
      useNativeDriver: true,
      damping: 20,
      stiffness: 220,
      mass: 0.9,
    }).start();
  }, [state.index]);

  return (
    <View style={[styles.container, { paddingBottom: bottomPad }]}>
      {/* ── Sliding active circle ── */}
      <Animated.View
        style={[
          styles.activeCircle,
          {
            transform: [{ translateX: circleX }],
          },
        ]}
      />

      {/* ── Tab buttons ── */}
      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[index];
        if (!config) return null;

        const isActive = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            if (Platform.OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isActive ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            activeOpacity={0.75}
          >
            {/* Icon sits inside the circle area */}
            <View style={styles.iconWrapper}>
              <Ionicons
                name={isActive ? config.iconActive : config.icon}
                size={22}
                color={isActive ? "#FFFFFF" : colors.textSecondary}
              />
            </View>

            {/* Label */}
            <Text
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
              numberOfLines={1}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 14,
  },
  activeCircle: {
    position: "absolute",
    top: 10,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
    zIndex: 0,
    // elevation: 0 is critical on Android — any positive elevation lifts
    // the circle above sibling views, hiding the icon inside it.
    elevation: 0,
    // iOS glow (shadow has no effect on Android stacking)
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 4,
    height: 64,
    gap: 2,
    // elevation: 2 ensures Android renders buttons above the circle (elevation: 0)
    elevation: 2,
    zIndex: 1,
  },
  iconWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.1,
  },
  labelActive: {
    color: colors.primary,
    fontFamily: fontFamily.semiBold,
  },
  labelInactive: {
    color: colors.textSecondary,
    fontFamily: fontFamily.medium,
  },
});
