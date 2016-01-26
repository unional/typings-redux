declare module redux {
	//This should be extended
	export interface IAction {
		type: string | number | Symbol;
	}

	export interface IActionGeneric<TPayload> extends IAction {
		payload?: TPayload;
		error?: Error;
		meta?: any;
	}

	export interface IActionCreator {
		(...args: any[]): IAction
	}
	
	export interface IReducer<TState> {
		(state: TState, action: IAction): TState;
	}

	export interface IReducerMap {
		[key: string]: IReducerMap | IReducer<any>
	}
	
	export interface IDispatch {
		(action: IAction): IAction;
	}

	export interface IMiddlewareStore<TState> {
		getState(): TState;

		dispatch: IDispatch;
	}

	export interface IStore<TState> extends IMiddlewareStore<TState> {
		subscribe(listener: (state: TState) => any): () => void;

		replaceReducer(nextReducer: IReducer<TState>): void;
	}

	export interface IMiddleware<State> {
		(middlewareStore: IMiddlewareStore<State>): (next: IDispatch) => IDispatch;
	}

	export interface ICreateStoreGeneric<TState> {
		(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;
	}

	export interface IStoreEnhancerGeneric<TState> {
		(createStore: ICreateStoreGeneric<TState>): ICreateStoreGeneric<TState>;
	}

	export function createStore<TState>(reducer: IReducer<TState>, initialState?: TState): IStore<TState>;	

	export function combineReducers(reducers: IReducerMap): IReducer<any>;
	export function combineReducers<TState>(reducers: IReducerMap): IReducer<TState>;	
	
	export function applyMiddleware<TState>(...middlewares: IMiddleware<TState>[]): IStoreEnhancerGeneric<TState>;

	export function bindActionCreators<TActionCreator extends IActionCreator | { [key: string]: IActionCreator }>(actionCreators: TActionCreator, dispatch: IDispatch): TActionCreator;

	export function compose<TArg>(...functions: { (arg: TArg): TArg }[]): (arg: TArg) => TArg;
	export function compose(...functions: { (arg: any): any }[]): (arg: any) => any;
}

declare module "redux" {
	export = redux;
}