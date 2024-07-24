import {getActionsKeys, getStagesKeys} from "./configuration";

describe ('Test configurations business logic', () => {
    test('actions keys array is generated correctly', () => {
        const actionKeys = getActionsKeys();
        expect(actionKeys).toEqual(['start', 'pause', 'stop']);
    }) ;

    test('stages keys array is generated correctly', () => {
        const stagesKeys = getStagesKeys();
        expect(stagesKeys).toEqual(['work', 'short_break', 'long_break']);
    })
});