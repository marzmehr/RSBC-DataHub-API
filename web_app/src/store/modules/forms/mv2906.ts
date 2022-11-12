import { twelveHourFormDataInfoType, twelveHourFormJsonInfoType, twelveHourFormStatesInfoType } from '@/types/Forms/MV2906';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  namespaced: true
})
class MV2906 extends VuexModule {

    public mv2906FormsJson: twelveHourFormJsonInfoType[] = [];
    public mv2906Info = {} as twelveHourFormDataInfoType;  
    public mv2906InfoStates = {} as twelveHourFormStatesInfoType;  
      
    @Mutation
    public setMV2906FormsJson(mv2906FormsJson: twelveHourFormJsonInfoType[]): void {   
        this.mv2906FormsJson = mv2906FormsJson;
    }    
    @Action
    public UpdateMV2906FormsJson(newMV2906FormsJson: twelveHourFormJsonInfoType[]): void {
        this.context.commit('setMV2906FormsJson', newMV2906FormsJson);
    }
  
    @Mutation
    public setMV2906Info(mv2906Info: twelveHourFormDataInfoType): void {   
        this.mv2906Info = mv2906Info;
    }    
    @Action
    public UpdateMV2906Info(newMV2906Info: twelveHourFormDataInfoType): void {
        this.context.commit('setMV2906Info', newMV2906Info);
    }  

    @Mutation
    public setMV2906InfoStates(mv2906InfoStates: twelveHourFormStatesInfoType): void {   
        this.mv2906InfoStates = mv2906InfoStates;
    }    
    @Action
    public UpdateMV2906InfoStates(newMV2906InfoStates: twelveHourFormStatesInfoType): void {
        this.context.commit('setMV2906InfoStates', newMV2906InfoStates);
    }   
    
}

export default MV2906