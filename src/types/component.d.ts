import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    [k: keyof import("naive-ui")]: typeof import("naive-ui")[k]
    // NButton: typeof import('naive-ui')['NButton']
    // NCard: typeof import('naive-ui')['NCard']
    // NConfigProvider: typeof import('naive-ui')['NConfigProvider']
    // NDropdown: typeof import('naive-ui')['NDropdown']
    // NGlobalStyle: typeof import('naive-ui')['NGlobalStyle']
    // NIcon: typeof import('naive-ui')['NIcon']
    // NInput: typeof import('naive-ui')['NInput']
    // NSelect: typeof import('naive-ui')['NSelect']
    // NSpace: typeof import('naive-ui')['NSpace']
    // NSwitch: typeof import('naive-ui')['NSwitch']
    // NTag: typeof import('naive-ui')['NTag']
    // NTimePicker: typeof import('naive-ui')['NTimePicker']
    // NLayout: typeof import("naive-ui")["NLayout"]
  }
}

export {}
