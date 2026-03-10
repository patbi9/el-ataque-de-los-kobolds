// Copyright Epic Games, Inc. All Rights Reserved.
/*===========================================================================
	Generated code exported from UnrealHeaderTool.
	DO NOT modify this manually! Edit the corresponding .h files instead!
===========================================================================*/

#include "UObject/GeneratedCppIncludes.h"
#include "Axolotl_IAGameMode.h"

PRAGMA_DISABLE_DEPRECATION_WARNINGS
static_assert(!UE_WITH_CONSTINIT_UOBJECT, "This generated code can only be compiled with !UE_WITH_CONSTINIT_OBJECT");
void EmptyLinkFunctionForGeneratedCodeAxolotl_IAGameMode() {}

// ********** Begin Cross Module References ********************************************************
AXOLOTL_IA_API UClass* Z_Construct_UClass_AAxolotl_IAGameMode();
AXOLOTL_IA_API UClass* Z_Construct_UClass_AAxolotl_IAGameMode_NoRegister();
ENGINE_API UClass* Z_Construct_UClass_AGameModeBase();
UPackage* Z_Construct_UPackage__Script_Axolotl_IA();
// ********** End Cross Module References **********************************************************

// ********** Begin Class AAxolotl_IAGameMode ******************************************************
FClassRegistrationInfo Z_Registration_Info_UClass_AAxolotl_IAGameMode;
UClass* AAxolotl_IAGameMode::GetPrivateStaticClass()
{
	using TClass = AAxolotl_IAGameMode;
	if (!Z_Registration_Info_UClass_AAxolotl_IAGameMode.InnerSingleton)
	{
		GetPrivateStaticClassBody(
			TClass::StaticPackage(),
			TEXT("Axolotl_IAGameMode"),
			Z_Registration_Info_UClass_AAxolotl_IAGameMode.InnerSingleton,
			StaticRegisterNativesAAxolotl_IAGameMode,
			sizeof(TClass),
			alignof(TClass),
			TClass::StaticClassFlags,
			TClass::StaticClassCastFlags(),
			TClass::StaticConfigName(),
			(UClass::ClassConstructorType)InternalConstructor<TClass>,
			(UClass::ClassVTableHelperCtorCallerType)InternalVTableHelperCtorCaller<TClass>,
			UOBJECT_CPPCLASS_STATICFUNCTIONS_FORCLASS(TClass),
			&TClass::Super::StaticClass,
			&TClass::WithinClass::StaticClass
		);
	}
	return Z_Registration_Info_UClass_AAxolotl_IAGameMode.InnerSingleton;
}
UClass* Z_Construct_UClass_AAxolotl_IAGameMode_NoRegister()
{
	return AAxolotl_IAGameMode::GetPrivateStaticClass();
}
struct Z_Construct_UClass_AAxolotl_IAGameMode_Statics
{
#if WITH_METADATA
	static constexpr UECodeGen_Private::FMetaDataPairParam Class_MetaDataParams[] = {
#if !UE_BUILD_SHIPPING
		{ "Comment", "/**\n *  Simple GameMode for a first person game\n */" },
#endif
		{ "HideCategories", "Info Rendering MovementReplication Replication Actor Input Movement Collision Rendering HLOD WorldPartition DataLayers Transformation" },
		{ "IncludePath", "Axolotl_IAGameMode.h" },
		{ "ModuleRelativePath", "Axolotl_IAGameMode.h" },
		{ "ShowCategories", "Input|MouseInput Input|TouchInput" },
#if !UE_BUILD_SHIPPING
		{ "ToolTip", "Simple GameMode for a first person game" },
#endif
	};
#endif // WITH_METADATA

// ********** Begin Class AAxolotl_IAGameMode constinit property declarations **********************
// ********** End Class AAxolotl_IAGameMode constinit property declarations ************************
	static UObject* (*const DependentSingletons[])();
	static constexpr FCppClassTypeInfoStatic StaticCppClassTypeInfo = {
		TCppClassTypeTraits<AAxolotl_IAGameMode>::IsAbstract,
	};
	static const UECodeGen_Private::FClassParams ClassParams;
}; // struct Z_Construct_UClass_AAxolotl_IAGameMode_Statics
UObject* (*const Z_Construct_UClass_AAxolotl_IAGameMode_Statics::DependentSingletons[])() = {
	(UObject* (*)())Z_Construct_UClass_AGameModeBase,
	(UObject* (*)())Z_Construct_UPackage__Script_Axolotl_IA,
};
static_assert(UE_ARRAY_COUNT(Z_Construct_UClass_AAxolotl_IAGameMode_Statics::DependentSingletons) < 16);
const UECodeGen_Private::FClassParams Z_Construct_UClass_AAxolotl_IAGameMode_Statics::ClassParams = {
	&AAxolotl_IAGameMode::StaticClass,
	"Game",
	&StaticCppClassTypeInfo,
	DependentSingletons,
	nullptr,
	nullptr,
	nullptr,
	UE_ARRAY_COUNT(DependentSingletons),
	0,
	0,
	0,
	0x008002ADu,
	METADATA_PARAMS(UE_ARRAY_COUNT(Z_Construct_UClass_AAxolotl_IAGameMode_Statics::Class_MetaDataParams), Z_Construct_UClass_AAxolotl_IAGameMode_Statics::Class_MetaDataParams)
};
void AAxolotl_IAGameMode::StaticRegisterNativesAAxolotl_IAGameMode()
{
}
UClass* Z_Construct_UClass_AAxolotl_IAGameMode()
{
	if (!Z_Registration_Info_UClass_AAxolotl_IAGameMode.OuterSingleton)
	{
		UECodeGen_Private::ConstructUClass(Z_Registration_Info_UClass_AAxolotl_IAGameMode.OuterSingleton, Z_Construct_UClass_AAxolotl_IAGameMode_Statics::ClassParams);
	}
	return Z_Registration_Info_UClass_AAxolotl_IAGameMode.OuterSingleton;
}
DEFINE_VTABLE_PTR_HELPER_CTOR_NS(, AAxolotl_IAGameMode);
AAxolotl_IAGameMode::~AAxolotl_IAGameMode() {}
// ********** End Class AAxolotl_IAGameMode ********************************************************

// ********** Begin Registration *******************************************************************
struct Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IAGameMode_h__Script_Axolotl_IA_Statics
{
	static constexpr FClassRegisterCompiledInInfo ClassInfo[] = {
		{ Z_Construct_UClass_AAxolotl_IAGameMode, AAxolotl_IAGameMode::StaticClass, TEXT("AAxolotl_IAGameMode"), &Z_Registration_Info_UClass_AAxolotl_IAGameMode, CONSTRUCT_RELOAD_VERSION_INFO(FClassReloadVersionInfo, sizeof(AAxolotl_IAGameMode), 2010102889U) },
	};
}; // Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IAGameMode_h__Script_Axolotl_IA_Statics 
static FRegisterCompiledInInfo Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IAGameMode_h__Script_Axolotl_IA_3291477422{
	TEXT("/Script/Axolotl_IA"),
	Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IAGameMode_h__Script_Axolotl_IA_Statics::ClassInfo, UE_ARRAY_COUNT(Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IAGameMode_h__Script_Axolotl_IA_Statics::ClassInfo),
	nullptr, 0,
	nullptr, 0,
};
// ********** End Registration *********************************************************************

PRAGMA_ENABLE_DEPRECATION_WARNINGS
