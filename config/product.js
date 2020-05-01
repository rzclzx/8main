import ApiConfig from './api.config'

export default function (i18n) {
  return [
    {
      name: i18n.t('product.otc'),
      href: ApiConfig.otcDomain,
      header: true,
      footer: true
    },
    {
      name: i18n.t('product.spot'),
      href: ApiConfig.spotDomain,
      header: true,
      footer: true
    },
    {
      name: i18n.t('product.swap'),
      href: ApiConfig.swapsDomain,
      header: true,
      footer: true
    },
    {
      name: i18n.t('product.labs'),
      href: ApiConfig.labsDomain,
      header: true,
      footer: true
    },
    {
      name: i18n.t('product.loan'),
      href: ApiConfig.loanDomain,
      header: true,
      footer: true
    },
    {
      name: i18n.t('applyCoin.58BTopics'),
      href: ApiConfig.mainDomain + '58BTopics',
      header: false,
      footer: true
    },
    {
      name: i18n.t('product.hash'),
      href: ApiConfig.hashDomain,
      header: false,
      footer: true
    }
  ]
}
