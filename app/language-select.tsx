import { colors } from "@/constants/colors";
import { fontFamily } from "@/constants/fonts";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelectScreen() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(query.toLowerCase())
  );

  function handleConfirm() {
    if (!selected) return;
    // TODO: persist to Zustand store in next feature
    router.back();
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose a language</Text>
        {/* spacer to centre the title */}
        <View style={styles.backBtn} />
      </View>

      {/* ── Search ── */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search languages"
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
      </View>

      {/* ── List ── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>Popular</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <LanguageRow
            language={item}
            isSelected={selected === item.code}
            onPress={() => setSelected(item.code)}
          />
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            {/* ── Confirm button ── */}
            <TouchableOpacity
              style={[styles.confirmBtn, !selected && styles.confirmBtnDisabled]}
              onPress={handleConfirm}
              activeOpacity={selected ? 0.85 : 1}
            >
              <Text style={[styles.confirmBtnLabel, !selected && styles.confirmBtnLabelDisabled]}>
                {selected
                  ? `Start learning ${languages.find((l) => l.code === selected)?.name}`
                  : "Select a language"}
              </Text>
            </TouchableOpacity>

            {/* ── Earth illustration ── */}
            <Image
              source={images.earth}
              style={styles.earthImage}
              resizeMode="contain"
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ─── Language Row Component ────────────────────────────────────────────────

interface LanguageRowProps {
  language: Language;
  isSelected: boolean;
  onPress: () => void;
}

function LanguageRow({ language, isSelected, onPress }: LanguageRowProps) {
  return (
    <TouchableOpacity
      style={[styles.row, isSelected && styles.rowSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Flag image */}
      <Image
        source={{ uri: language.flag }}
        style={styles.flag}
        resizeMode="cover"
      />

      {/* Name + learner count */}
      <View style={styles.rowText}>
        <Text style={styles.langName}>{language.name}</Text>
        <Text style={styles.langMeta}>{language.learnerCount} learners</Text>
      </View>

      {/* Selected check OR chevron */}
      {isSelected ? (
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.textPrimary,
  },

  // Search
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 72, // indent past the flag
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  rowSelected: {
    backgroundColor: "#EEE9FF",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  flag: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.border,
  },
  rowText: {
    flex: 1,
    marginLeft: 14,
  },
  langName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  langMeta: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // Footer
  footer: {
    marginTop: 24,
    alignItems: "center",
    gap: 24,
  },
  confirmBtn: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnDisabled: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  confirmBtnLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#FFFFFF",
  },
  confirmBtnLabelDisabled: {
    color: colors.textSecondary,
  },
  earthImage: {
    width: "100%",
    height: 180,
  },
});
