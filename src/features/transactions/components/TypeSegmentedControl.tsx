import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';
import { TranslationKey, useTranslation } from '@/i18n';
import type { TypeFilter } from '../utils/filter';

interface TypeSegmentedControlProps {
  value: TypeFilter;
  onChange: (value: TypeFilter) => void;
}

interface Segment {
  value: TypeFilter;
  labelKey: TranslationKey;
  renderIcon?: (active: boolean) => React.ReactNode;
}

const ICON_SIZE = 16;
const TRACK_PADDING = 4;

const SEGMENTS: Segment[] = [
  { value: 'all', labelKey: 'segment.all' },
  {
    value: 'incoming',
    labelKey: 'segment.incoming',
    renderIcon: () => <ArrowDown size={ICON_SIZE} color={colors.incoming} />,
  },
  {
    value: 'outgoing',
    labelKey: 'segment.outgoing',
    renderIcon: () => <ArrowUp size={ICON_SIZE} color={colors.outgoing} />,
  },
];

export function TypeSegmentedControl({
  value,
  onChange,
}: TypeSegmentedControlProps) {
  const { t } = useTranslation();
  const [trackWidth, setTrackWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const segmentWidth =
    trackWidth > 0 ? (trackWidth - TRACK_PADDING * 2) / SEGMENTS.length : 0;
  const activeIndex = SEGMENTS.findIndex(s => s.value === value);

  useEffect(() => {
    if (segmentWidth <= 0) {
      return;
    }
    Animated.spring(translateX, {
      toValue: activeIndex * segmentWidth,
      useNativeDriver: true,
      friction: 14,
      tension: 140,
    }).start();
  }, [activeIndex, segmentWidth, translateX]);

  const onLayout = (event: LayoutChangeEvent) =>
    setTrackWidth(event.nativeEvent.layout.width);

  return (
    <View style={styles.track} onLayout={onLayout}>
      {segmentWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            { width: segmentWidth, transform: [{ translateX }] },
          ]}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={12}
            reducedTransparencyFallbackColor={colors.primaryLight}
          />
          <View style={styles.indicatorTint} />
        </Animated.View>
      ) : null}

      {SEGMENTS.map(segment => {
        const selected = value === segment.value;
        return (
          <Pressable
            key={segment.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(segment.value)}
            style={styles.segment}
          >
            {segment.renderIcon?.(selected)}
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {t(segment.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: TRACK_PADDING,
  },
  indicator: {
    position: 'absolute',
    left: TRACK_PADDING,
    top: TRACK_PADDING,
    bottom: TRACK_PADDING,
    borderRadius: spacing.xxl,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.28)',
    overflow: 'hidden',
  },
  indicatorTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(37, 99, 235, 0.14)',
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm + 2,
  },
  label: { ...typography.bodySmall, fontWeight: '600', color: colors.text },
  labelSelected: { color: colors.primary },
});
