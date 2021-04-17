import * as typeAction from './typeAction'
export function loadingAction(isAction){
    return {
        type:typeAction.IS_LOADING,
        isAction
    }
}