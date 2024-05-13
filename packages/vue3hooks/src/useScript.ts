import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 定义ScriptOptions接口
 * @interface ScriptOptions
 * @property {string} src - 脚本资源的URL
 */
interface ScriptOptions {
  src: string
}

/**
 * @exports useScript
 * @description: 创建一个Vue的组合式API，用于加载外部JavaScript脚本
 * 在挂载时插入脚本标签，在卸载时移除脚本标签，并提供加载状态的响应式变量和加载方法

 * @param {ScriptOptions} opts - 包含脚本src地址的对象
 * @returns {Object} 包含脚本加载状态及加载方法的对象
 * @property {Ref<boolean>} isLoading - 是否正在加载脚本的响应式引用
 * @property {Ref<boolean>} error - 加载脚本过程中是否发生错误的响应式引用
 * @property {Ref<boolean>} success - 脚本加载是否成功的响应式引用
 * @method {Function} load - 返回一个Promise，加载完成后resolve，加载错误则reject

 * 示例：
 * ```javascript
 * import { useScript } from './useScript';
 * setup() {
 *   const scriptOpts = { src: 'https://example.com/script.js' };
 *   const { isLoading, error, success, load } = useScript(scriptOpts);
 *   
 *   load().then(() => {
 *     console.log('Script loaded successfully!');
 *   }).catch((err) => {
 *     console.error('Failed to load script:', err);
 *   });
 *   
 *   return {
 *     isLoading,
 *     error,
 *     success,
 *   };
 * }
 * ```
 */
export function useScript(opts: ScriptOptions) {
  const isLoading = ref(false)
  const error = ref(false)
  const success = ref(false)
  let script: HTMLScriptElement

  const promise = new Promise<void>((resolve, reject) => {
    onMounted(() => {
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = function () {
        isLoading.value = false
        success.value = true
        error.value = false
        resolve()
      }

      script.onerror = function (err) {
        isLoading.value = false
        success.value = false
        error.value = true
        reject(err)
      }

      script.src = opts.src
      document.head.appendChild(script)
    })
  })

  onUnmounted(() => {
    script && script.remove()
  })

  return {
    isLoading,
    error,
    success,
    load: () => promise,
  }
}
