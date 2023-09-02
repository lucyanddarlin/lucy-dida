import {  useRouter } from "vue-router";

/**
 * 跳转 hooks
 */
export function useGoto() {
  const router = useRouter()

  // function gotoHome() {
  //   router.push
  // }
}

export const GITHUB_URL = 'https://github.com/lucyanddarlin/lucy-dida' 
/**
 * 打开 Github
 */
export function openGithub() {
  window.open(GITHUB_URL)
}