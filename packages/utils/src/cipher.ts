/* eslint-disable @typescript-eslint/no-empty-function */
import { decrypt as aesDecrypt, encrypt as aesEncrypt } from 'crypto-js/aes'
import UTF8, { parse } from 'crypto-js/enc-utf8'
import pkcs7 from 'crypto-js/pad-pkcs7'
import CTR from 'crypto-js/mode-ctr'
import Base64 from 'crypto-js/enc-base64'
import MD5 from 'crypto-js/md5'
import SHA256 from 'crypto-js/sha256'
import SHA512 from 'crypto-js/sha512'

/**
 * 定义加密接口
 * @interface Encryption
 */
export interface Encryption {
  /**
   * 对明文进行加密
   * @param {string} plainText - 明文字符串
   * @returns {string} - 加密后的密文字符串
   */
  encrypt(plainText: string): string
  /**
   * 对密文进行解密
   * @param {string} cipherText - 密文字符串
   * @returns {string} - 解密后的明文字符串
   */
  decrypt(cipherText: string): string
}

/**
 * 定义哈希接口
 * @interface Hashing
 */
export interface Hashing {
  /**
   * 对数据进行哈希计算
   * @param {string} data - 需要哈希的数据字符串
   * @returns {string} - 哈希后的字符串
   */
  hash(data: string): string
}

/**
 * 定义AES加密所需的参数类型
 * @interface EncryptionParams
 */
export interface EncryptionParams {
  /**
   * 密钥
   */
  key: string
  /**
   * 向量
   */
  iv: string
}

/**
 * AES加密实现类
 * @class
 * @implements {Encryption}
 */
export class AesEncryption implements Encryption {
  private readonly key
  private readonly iv

  /**
   * 构造函数，初始化密钥和向量
   * @param {EncryptionParams} params - 加密参数对象
   */
  constructor({ key, iv }: EncryptionParams) {
    this.key = parse(key)
    this.iv = parse(iv)
  }

  /**
   * 获取AES加密所需的选项对象
   * @returns {{mode: any, padding: any, iv: any}} - 加密选项对象
   */
  get getOptions(): any {
    return {
      mode: CTR,
      padding: pkcs7,
      iv: this.iv,
    }
  }

  /**
   * 加密方法
   * @override
   * @param {string} plainText - 明文字符串
   * @returns {string} - 加密后的密文字符串
   */
  encrypt(plainText: string) {
    return aesEncrypt(plainText, this.key, this.getOptions).toString()
  }

  /**
   * 解密方法
   * @override
   * @param {string} cipherText - 密文字符串
   * @returns {string} - 解密后的明文字符串
   */
  decrypt(cipherText: string) {
    return aesDecrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

/**
 * Base64加密实现类（使用单例模式）
 * @class
 * @implements {Encryption}
 */
class Base64Encryption implements Encryption {
  private static instance: Base64Encryption

  private constructor() {}

  /**
   * 获取Base64加密的单例实例
   * @static
   * @returns {Base64Encryption} - Base64加密实例
   */
  public static getInstance(): Base64Encryption {
    if (!Base64Encryption.instance) {
      Base64Encryption.instance = new Base64Encryption()
    }
    return Base64Encryption.instance
  }

  /**
   * 加密方法
   * @override
   * @param {string} plainText - 明文字符串
   * @returns {string} - Base64编码后的字符串
   */
  encrypt(plainText: string) {
    return UTF8.parse(plainText).toString(Base64)
  }

  /**
   * 解密方法
   * @override
   * @param {string} cipherText - Base64编码后的字符串
   * @returns {string} - 解码后的明文字符串
   */
  decrypt(cipherText: string) {
    return Base64.parse(cipherText).toString(UTF8)
  }
}

/**
 * MD5加密实现类（使用单例模式）
 * @class
 * @implements {Encryption}
 */
class MD5Hashing implements Hashing {
  private static instance: MD5Hashing

  private constructor() {}

  public static getInstance(): MD5Hashing {
    if (!MD5Hashing.instance) {
      MD5Hashing.instance = new MD5Hashing()
    }
    return MD5Hashing.instance
  }

  hash(plainText: string) {
    return MD5(plainText).toString()
  }
}

/**
 * SHA256加密实现类（使用单例模式）
 * @class
 * @implements {Encryption}
 */
class SHA256Hashing implements Hashing {
  private static instance: SHA256Hashing

  private constructor() {}

  public static getInstance(): SHA256Hashing {
    if (!SHA256Hashing.instance) {
      SHA256Hashing.instance = new SHA256Hashing()
    }
    return SHA256Hashing.instance
  }

  hash(plainText: string) {
    return SHA256(plainText).toString()
  }
}

/**
 * SHA512加密实现类（使用单例模式）
 * @class
 * @implements {Encryption}
 */
class SHA512Hashing implements Hashing {
  private static instance: SHA512Hashing

  private constructor() {}

  public static getInstance(): SHA256Hashing {
    if (!SHA512Hashing.instance) {
      SHA512Hashing.instance = new SHA512Hashing()
    }
    return SHA512Hashing.instance
  }

  hash(plainText: string) {
    return SHA512(plainText).toString()
  }
}

/**
 * 加密工厂类，用于创建不同类型的加密实例
 * @class
 */
export class EncryptionFactory {
  /**
   * 创建AES加密实例
   * @static
   * @param {EncryptionParams} params - AES加密参数
   * @returns {Encryption} - AES加密实例
   */
  public static createAesEncryption(params: EncryptionParams): Encryption {
    return new AesEncryption(params)
  }

  /**
   * 创建Base64加密实例
   * @static
   * @returns {Encryption} - Base64加密实例
   */
  public static createBase64Encryption(): Encryption {
    return Base64Encryption.getInstance()
  }
}

/**
 * 哈希工厂类，用于创建不同类型的哈希实例
 * @class
 */
export class HashingFactory {
  /**
   * 创建MD5哈希实例
   * @static
   * @returns {Hashing} - MD5哈希实例
   */
  public static createMD5Hashing(): Hashing {
    return MD5Hashing.getInstance()
  }

  /**
   * 创建SHA256哈希实例
   * @static
   * @returns {Hashing} - SHA256哈希实例
   */
  public static createSHA256Hashing(): Hashing {
    return SHA256Hashing.getInstance()
  }

  /**
   * 创建SHA512哈希实例
   * @static
   * @returns {Hashing} - SHA512哈希实例
   */
  public static createSHA512Hashing(): Hashing {
    return SHA512Hashing.getInstance()
  }
}
