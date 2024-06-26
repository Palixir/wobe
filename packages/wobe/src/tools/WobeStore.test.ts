import { describe, expect, it, beforeEach, spyOn } from 'bun:test'
import { WobeStore } from './WobeStore'

describe('WobeStore', () => {
	const wobeStore = new WobeStore({
		interval: 100,
	})

	beforeEach(() => {
		wobeStore.clear()
	})

	it('should init a WobeStore', () => {
		const spySetInterval = spyOn(global, 'setInterval')
		const spyClearInterval = spyOn(global, 'clearInterval')

		const store = new WobeStore({ interval: 100 })

		store.stop()

		expect(spySetInterval).toHaveBeenCalledTimes(1)
		expect(spySetInterval).toHaveBeenCalledWith(expect.any(Function), 100)
		expect(spyClearInterval).toHaveBeenCalledTimes(1)
		expect(spyClearInterval).toHaveBeenCalledWith(store.intervalId)
	})

	it('should store a value', () => {
		wobeStore.set('key', 'value')

		expect(wobeStore.get('key')).toBe('value')
	})

	it('should clear a wobe store', () => {
		wobeStore.set('key', 'value')

		expect(wobeStore.get('key')).toBe('value')

		wobeStore.clear()

		expect(wobeStore.get('key')).toBeUndefined()
	})

	it('should return undefined if the key does not exist', () => {
		expect(wobeStore.get('key2')).toBeUndefined()
	})

	it('should clear a cache after timeLimit', () => {
		const localWobeStore = new WobeStore({
			interval: 100,
		})

		localWobeStore.set('key', 'value')

		setTimeout(() => {
			expect(localWobeStore.get('key')).not.toBeUndefined()
		}, 50)

		setTimeout(() => {
			expect(localWobeStore.get('key')).toBeUndefined()
		}, 100)
	})
})
