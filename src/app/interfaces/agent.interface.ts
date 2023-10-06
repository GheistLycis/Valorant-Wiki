export interface Agent {
    uuid: string
    displayName: string
    description: string
    developerName: string
    characterTags: string[]
    displayIcon: string
    displayIconSmall: string
    bustPortrait: string
    fullPortrait: string
    fullPortraitV2: string
    killfeedPortrait: string
    background: string
    backgroundGradientColors: string[]
    assetPath: string
    isFullPortraitRightFacing: boolean
    isPlayableCharacter: boolean
    isAvailableForTest: boolean
    isBaseContent: boolean
    role: {
        uuid: string
        displayName: string
        description: string
        displayIcon: string
        assetPath: string
    }
    recruitmentData: {
        counterId: string
        milestoneId: string
        milestoneThreshold: number
        useLevelVpCostOverride: boolean
        levelVpCostOverride: number
        startDate: Date
        endDate: Date
    }
    abilities: {
        slot: string
        displayName: string
        description: string
        displayIcon: string
    }[]
    voiceLine: {
        minDuration: number
        maxDuration: number
        mediaList: {
            id: number
            wwise: string
            wave: string
        }[]
    }
}