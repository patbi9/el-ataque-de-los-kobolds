// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

public class Axolotl_IA : ModuleRules
{
	public Axolotl_IA(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] {
			"Core",
			"CoreUObject",
			"Engine",
			"InputCore",
			"EnhancedInput",
			"AIModule",
			"StateTreeModule",
			"GameplayStateTreeModule",
			"UMG",
			"Slate"
		});

		PrivateDependencyModuleNames.AddRange(new string[] { });

		PublicIncludePaths.AddRange(new string[] {
			"Axolotl_IA",
			"Axolotl_IA/Variant_Horror",
			"Axolotl_IA/Variant_Horror/UI",
			"Axolotl_IA/Variant_Shooter",
			"Axolotl_IA/Variant_Shooter/AI",
			"Axolotl_IA/Variant_Shooter/UI",
			"Axolotl_IA/Variant_Shooter/Weapons"
		});

		// Uncomment if you are using Slate UI
		// PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });

		// Uncomment if you are using online features
		// PrivateDependencyModuleNames.Add("OnlineSubsystem");

		// To include OnlineSubsystemSteam, add it to the plugins section in your uproject file with the Enabled attribute set to true
	}
}
