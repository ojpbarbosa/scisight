const ML_URL = 'https://ml.scisight.earth'
const CORE_URL = 'https://core.scisight.earth'

export type PredictedMetadata = {
  api: string
  field: string
  context: string
  input: string
}

export type SearchResult = {
  type: 'nasa' | 'weather'
  weather: {
    features: {
      properties: {
        areaDesc: string
        severity: string
        urgency: string
        event: string
        headline: string
        description: string
        instruction: string
      }
    }[]
    title: string
    updated: Date
  }
  nasa: {
    title: string
    description: string
    link: string
    events: {
      id: string
      title: string
      geometries: {
        date: Date
        type: string
        coordinates: [number, number]
      }
    }
  }
  relatedScientificInfo: string[]
  bestAPIsOptions: {
    api: string
    reason: string
  }[]
}

export const api = {
  ml: {
    predict: async (version: 'v1' | 'v2', query: string) => {
      const response = await fetch(`${ML_URL}/api/${version}/predict`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query })
      })

      if (!response.ok) return undefined

      const data: PredictedMetadata = await response.json()

      return data
    },
    fetchRandomTrainTexts: async (version: 'v1' | 'v2', n: number) => {
      const response = await fetch(`${ML_URL}/api/${version}/random-train-texts?n=${n}`, {
        method: 'GET'
      })

      if (!response.ok) return undefined

      const data: string[] = await response.json()

      return data.length === 1 ? data[0] : data
    }
  },
  core: {
    search: async (predictedQuery: PredictedMetadata) => {
      const response = await fetch(`${CORE_URL}/search/${predictedQuery.api.toLowerCase()}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(predictedQuery)
      })

      if (!response.ok) return undefined

      const data: SearchResult = await response.json()

      return data
    }
  }
}
