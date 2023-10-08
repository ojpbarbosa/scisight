const ML_URL = 'https://ml.scisight.earth'

export const api = {
  ml: {
    predict: async (query: string) => {
      const response = await fetch(`${ML_URL}/api/predict`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query })
      })

      if (!response.ok) return undefined

      const data = await response.json()

      return data
    },
    fetchRandomTrainTexts: async (n: number) => {
      const response = await fetch(`${ML_URL}/api/random-train-texts?n=${n}`, {
        method: 'GET'
      })

      if (!response.ok) return undefined

      const data = await response.json()

      return data
    }
  }
}
