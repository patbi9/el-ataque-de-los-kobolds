// Copyright Epic Games, Inc. All Rights Reserved.
/*===========================================================================
	Generated code exported from UnrealHeaderTool.
	DO NOT modify this manually! Edit the corresponding .h files instead!
===========================================================================*/

#include "UObject/GeneratedCppIncludes.h"
#include "Axolotl_IACameraManager.h"

PRAGMA_DISABLE_DEPRECATION_WARNINGS
static_assert(!UE_WITH_CONSTINIT_UOBJECT, "This generated code can only be compiled with !UE_WITH_CONSTINIT_OBJECT");
void EmptyLinkFunctionForGeneratedCodeAxolotl_IACameraManager() {}

// ********** Begin Cross Module References ********************************************************
AXOLOTL_IA_API UClass* Z_Construct_UClass_AAxolotl_IACameraManager();
AXOLOTL_IA_API UClass* Z_Construct_UClass_AAxolotl_IACameraManager_NoRegister();
ENGINE_API UClass* Z_Construct_UClass_APlayerCameraManager();
UPackage* Z_Construct_UPackage__Script_Axolotl_IA();
// ********** End Cross Module References **********************************************************

// ********** Begin Class AAxolotl_IACameraManager *************************************************
FClassRegistrationInfo Z_Registration_Info_UClass_AAxolotl_IACameraManager;
UClass* AAxolotl_IACameraManager::GetPrivateStaticClass()
{
	using TClass = AAxolotl_IACameraManager;
	if (!Z_Registration_Info_UClass_AAxolotl_IACameraManager.InnerSingleton)
	{
		GetPrivateStaticClassBody(
			TClass::StaticPackage(),
			TEXT("Axolotl_IACameraManager"),
			Z_Registration_Info_UClass_AAxolotl_IACameraManager.InnerSingleton,
			StaticRegisterNativesAAxolotl_IACameraManager,
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
	return Z_Registration_Info_UClass_AAxolotl_IACameraManager.InnerSingleton;
}
UClass* Z_Construct_UClass_AAxolotl_IACameraManager_NoRegister()
{
	return AAxolotl_IACameraManager::GetPrivateStaticClass();
}
struct Z_Construct_UClass_AAxolotl_IACameraManager_Statics
{
#if WITH_METADATA
	static constexpr UECodeGen_Private::FMetaDataPairParam Class_MetaDataParams[] = {
#if !UE_BUILD_SHIPPING
		{ "Comment", "/**\n *  Basic First Person camera manager.\n *  Limits min/max look pitch.\n */" },
#endif
		{ "IncludePath", "Axolotl_IACameraManager.h" },
		{ "ModuleRelativePath", "Axolotl_IACameraManager.h" },
#if !UE_BUILD_SHIPPING
		{ "ToolTip", "Basic First Person camera manager.\nLimits min/max look pitch." },
#endif
	};
#endif // WITH_METADATA

// ********** Begin Class AAxolotl_IACameraManager constinit property declarations *****************
// ********** End Class AAxolotl_IACameraManager constinit property declarations *******************
	static UObject* (*const DependentSingletons[])();
	static constexpr FCppClassTypeInfoStatic StaticCppClassTypeInfo = {
		TCppClassTypeTraits<AAxolotl_IACameraManager>::IsAbstract,
	};
	static const UECodeGen_Private::FClassParams ClassParams;
}; // struct Z_Construct_UClass_AAxolotl_IACameraManager_Statics
UObject* (*const Z_Construct_UClass_AAxolotl_IACameraManager_Statics::DependentSingletons[])() = {
	(UObject* (*)())Z_Construct_UClass_APlayerCameraManager,
	(UObject* (*)())Z_Construct_UPackage__Script_Axolotl_IA,
};
static_assert(UE_ARRAY_COUNT(Z_Construct_UClass_AAxolotl_IACameraManager_Statics::DependentSingletons) < 16);
const UECodeGen_Private::FClassParams Z_Construct_UClass_AAxolotl_IACameraManager_Statics::ClassParams = {
	&AAxolotl_IACameraManager::StaticClass,
	"Engine",
	&StaticCppClassTypeInfo,
	DependentSingletons,
	nullptr,
	nullptr,
	nullptr,
	UE_ARRAY_COUNT(DependentSingletons),
	0,
	0,
	0,
	0x008002ACu,
	METADATA_PARAMS(UE_ARRAY_COUNT(Z_Construct_UClass_AAxolotl_IACameraManager_Statics::Class_MetaDataParams), Z_Construct_UClass_AAxolotl_IACameraManager_Statics::Class_MetaDataParams)
};
void AAxolotl_IACameraManager::StaticRegisterNativesAAxolotl_IACameraManager()
{
}
UClass* Z_Construct_UClass_AAxolotl_IACameraManager()
{
	if (!Z_Registration_Info_UClass_AAxolotl_IACameraManager.OuterSingleton)
	{
		UECodeGen_Private::ConstructUClass(Z_Registration_Info_UClass_AAxolotl_IACameraManager.OuterSingleton, Z_Construct_UClass_AAxolotl_IACameraManager_Statics::ClassParams);
	}
	return Z_Registration_Info_UClass_AAxolotl_IACameraManager.OuterSingleton;
}
DEFINE_VTABLE_PTR_HELPER_CTOR_NS(, AAxolotl_IACameraManager);
AAxolotl_IACameraManager::~AAxolotl_IACameraManager() {}
// ********** End Class AAxolotl_IACameraManager ***************************************************

// ********** Begin Registration *******************************************************************
struct Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IACameraManager_h__Script_Axolotl_IA_Statics
{
	static constexpr FClassRegisterCompiledInInfo ClassInfo[] = {
		{ Z_Construct_UClass_AAxolotl_IACameraManager, AAxolotl_IACameraManager::StaticClass, TEXT("AAxolotl_IACameraManager"), &Z_Registration_Info_UClass_AAxolotl_IACameraManager, CONSTRUCT_RELOAD_VERSION_INFO(FClassReloadVersionInfo, sizeof(AAxolotl_IACameraManager), 1519576920U) },
	};
}; // Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IACameraManager_h__Script_Axolotl_IA_Statics 
static FRegisterCompiledInInfo Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IACameraManager_h__Script_Axolotl_IA_3277875388{
	TEXT("/Script/Axolotl_IA"),
	Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IACameraManager_h__Script_Axolotl_IA_Statics::ClassInfo, UE_ARRAY_COUNT(Z_CompiledInDeferFile_FID_Users_Usuario_Documents_Unreal_Projects_Axolotl_IA_Source_Axolotl_IA_Axolotl_IACameraManager_h__Script_Axolotl_IA_Statics::ClassInfo),
	nullptr, 0,
	nullptr, 0,
};
// ********** End Registration *********************************************************************

PRAGMA_ENABLE_DEPRECATION_WARNINGS
