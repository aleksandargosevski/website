<script setup>
const props = defineProps({
  title: { type: String, default: 'Notes on building things.' },
  description: { type: String, default: '' },
  eyebrow: { type: String, default: 'aleksandargosevski.com' },
  meta: { type: String, default: '' },
  tone: { type: String, default: 'sky' },
})

const tones = {
  butter: { base: '#ffe07a', deep: '#e8b938', soft: '#fff6d6' },
  mint: { base: '#94e5c6', deep: '#4fc199', soft: '#e2f8ef' },
  bubblegum: { base: '#ffb7d3', deep: '#f07fab', soft: '#ffe9f1' },
  sky: { base: '#a8d6ff', deep: '#5ea9f0', soft: '#e5f2ff' },
  lilac: { base: '#cbc5ff', deep: '#8f84f2', soft: '#eeecff' },
}

const color = computed(() => tones[props.tone] ?? tones.sky)
const titleSize = computed(() => {
  if (props.title.length > 60) return '58px'
  if (props.title.length > 20) return '70px'
  return '84px'
})
</script>

<template>
  <div
    class="w-full h-full flex"
    :style="{
      fontFamily: 'FigtreeOG',
      color: '#1f264a',
      backgroundColor: '#f3f5fa',
      backgroundImage: 'linear-gradient(165deg, #e2efff 0%, #ebe8ff 55%, #f6ecfb 100%)',
      padding: '40px',
    }"
  >
    <div
      class="w-full h-full flex flex-col justify-between"
      :style="{
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '36px',
        border: '2px solid rgba(31, 38, 74, 0.08)',
        borderLeft: `18px solid ${color.base}`,
        padding: '52px 60px 48px 56px',
        boxShadow: '0 24px 48px -24px rgba(31, 38, 74, 0.25)',
        overflow: 'hidden',
      }"
    >
      <div
        :style="{
          position: 'absolute',
          top: '-120px',
          right: '-90px',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          backgroundColor: color.soft,
        }"
      />
      <div
        :style="{
          position: 'absolute',
          top: '52px',
          right: '60px',
          width: '84px',
          height: '84px',
          borderRadius: '28px',
          backgroundColor: color.base,
        }"
      />

      <div
        class="flex items-center"
        :style="{ position: 'relative' }"
      >
        <div
          class="flex items-center"
          :style="{
            gap: '12px',
            padding: '10px 22px',
            borderRadius: '999px',
            backgroundColor: color.soft,
            border: `2px solid ${color.base}`,
            fontSize: '26px',
            fontWeight: 700,
          }"
        >
          <div
            :style="{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: color.deep }"
          />
          {{ eyebrow }}
        </div>
      </div>

      <div
        class="flex flex-col"
        :style="{ position: 'relative', gap: '18px', paddingRight: '40px' }"
      >
        <div
          :style="{
            fontSize: titleSize,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }"
        >
          {{ title }}
        </div>
        <div
          v-if="description"
          :style="{
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: 1.4,
            color: '#525a7e',
            lineClamp: 2,
            textOverflow: 'ellipsis',
          }"
        >
          {{ description }}
        </div>
      </div>

      <div
        class="flex items-center justify-between"
        :style="{ position: 'relative', gap: '24px' }"
      >
        <div
          class="flex items-center"
          :style="{ gap: '18px' }"
        >
          <img
            src="/aleksandar-gosevski-avatar.jpg"
            alt=""
            width="72"
            height="72"
            :style="{ borderRadius: '20px', border: '3px solid #ffffff', boxShadow: '0 0 0 3px #ffe07a' }"
          >
          <div class="flex flex-col">
            <span :style="{ fontSize: '28px', fontWeight: 800 }">Aleksandar Goševski</span>
            <span :style="{ fontSize: '22px', fontWeight: 500, color: '#7c82a2' }">Software engineer</span>
          </div>
        </div>
        <span
          v-if="meta"
          :style="{ fontSize: '24px', fontWeight: 700, color: '#7c82a2' }"
        >{{ meta }}</span>
      </div>
    </div>
  </div>
</template>
