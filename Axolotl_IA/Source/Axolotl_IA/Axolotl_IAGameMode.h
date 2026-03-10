// Copyright Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "Axolotl_IAGameMode.generated.h"

/**
 *  Simple GameMode for a first person game
 */
UCLASS(abstract)
class AAxolotl_IAGameMode : public AGameModeBase
{
	GENERATED_BODY()

public:
	AAxolotl_IAGameMode();
};



