
export const draft_save = {
  draft_save: true
}
export function get_save_draft() {
  return { data() {
    return {
      uploadHeaders_1: true
    }
  } }
}

export function set_save_draft(flag) {
  draft_save.draft_save = flag
}
