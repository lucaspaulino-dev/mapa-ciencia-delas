import { describe, it, expect } from 'vitest'

import { toMapPosition } from '@/utils/map-position'

describe('toMapPosition', () => {
  it('põe o cruzamento do equador com Greenwich no centro do mapa', () => {
    expect(toMapPosition({ lat: 0, lng: 0 })).toEqual({ left: '50%', top: '50%' })
  })

  it('põe os cantos do mundo nos cantos do mapa', () => {
    expect(toMapPosition({ lat: 90, lng: -180 })).toEqual({ left: '0%', top: '0%' })
    expect(toMapPosition({ lat: -90, lng: 180 })).toEqual({ left: '100%', top: '100%' })
  })

  it('põe São Paulo a oeste do centro e abaixo do equador', () => {
    expect(toMapPosition({ lat: -23.55, lng: -46.63 })).toEqual({ left: '37.05%', top: '63.08%' })
  })
})
