// Copyright Epic Games, Inc. All Rights Reserved.
/*===========================================================================
	Generated code exported from UnrealHeaderTool.
	DO NOT modify this manually! Edit the corresponding .h files instead!
===========================================================================*/

#include "UObject/GeneratedCppIncludes.h"
PRAGMA_DISABLE_DEPRECATION_WARNINGS
void EmptyLinkFunctionForGeneratedCodeAxolotl_IA_init() {}
static_assert(!UE_WITH_CONSTINIT_UOBJECT, "This generated code can only be compiled with !UE_WITH_CONSTINIT_OBJECT");	AXOLOTL_IA_API UFunction* Z_Construct_UDelegateFunction_Axolotl_IA_BulletCountUpdatedDelegate__DelegateSignature();
	AXOLOTL_IA_API UFunction* Z_Construct_UDelegateFunction_Axolotl_IA_DamagedDelegate__DelegateSignature();
	AXOLOTL_IA_API UFunction* Z_Construct_UDelegateFunction_Axolotl_IA_PawnDeathDelegate__DelegateSignature();
	AXOLOTL_IA_API UFunction* Z_Construct_UDelegateFunction_Axolotl_IA_SprintStateChangedDelegate__DelegateSignature();
	AXOLOTL_IA_API UFunction* Z_Construct_UDelegateFunction_Axolotl_IA_UpdateSprintMeterDelegate__DelegateSignature();
	static FPackageRegistrationInfo Z_Registration_Info_UPackage__Script_Axolotl_IA;
	FORCENOINLINE UPackage* Z_Construct_UPackage__Script_Axolotl_IA()
	{
		if (!Z_Registration_Info_UPackage__Script_Axolotl_IA.OuterSingleton)
		{
		static UObject* (*const SingletonFuncArray[])() = {
			(UObject* (*)())Z_Construct_UDelegateFunction_Axolotl_IA_BulletCountUpdatedDelegate__DelegateSignature,
			(UObject* (*)())Z_Construct_UDelegateFunction_Axolotl_IA_DamagedDelegate__DelegateSignature,
			(UObject* (*)())Z_Construct_UDelegateFunction_Axolotl_IA_PawnDeathDelegate__DelegateSignature,
			(UObject* (*)())Z_Construct_UDelegateFunction_Axolotl_IA_SprintStateChangedDelegate__DelegateSignature,
			(UObject* (*)())Z_Construct_UDelegateFunction_Axolotl_IA_UpdateSprintMeterDelegate__DelegateSignature,
		};
		static const UECodeGen_Private::FPackageParams PackageParams = {
			"/Script/Axolotl_IA",
			SingletonFuncArray,
			UE_ARRAY_COUNT(SingletonFuncArray),
			PKG_CompiledIn | 0x00000000,
			0x8A7DB31D,
			0x21EF12E0,
			METADATA_PARAMS(0, nullptr)
		};
		UECodeGen_Private::ConstructUPackage(Z_Registration_Info_UPackage__Script_Axolotl_IA.OuterSingleton, PackageParams);
	}
	return Z_Registration_Info_UPackage__Script_Axolotl_IA.OuterSingleton;
}
static FRegisterCompiledInInfo Z_CompiledInDeferPackage_UPackage__Script_Axolotl_IA(Z_Construct_UPackage__Script_Axolotl_IA, TEXT("/Script/Axolotl_IA"), Z_Registration_Info_UPackage__Script_Axolotl_IA, CONSTRUCT_RELOAD_VERSION_INFO(FPackageReloadVersionInfo, 0x8A7DB31D, 0x21EF12E0));
PRAGMA_ENABLE_DEPRECATION_WARNINGS
