import {getActionsKeys, getStageName, getStagesKeys} from "./configuration";

describe ('Test configurations business logic', () => {
    test('actions keys array is generated correctly', () => {
        const actionKeys = getActionsKeys();
        expect(actionKeys).toEqual(['start', 'pause', 'stop']);
    });

    test('stages keys array is generated correctly', () => {
        const stagesKeys = getStagesKeys();
        expect(stagesKeys).toEqual(['work', 'short_break', 'long_break']);
    });

    test('get single stage name', () => {
        expect(getStageName('long_break')).toEqual('Long break');
    });
    test('get single name with invalid key', () => {
        expect(() => getStageName('invalid_key')).toThrow('Invalid argument');
    });
});