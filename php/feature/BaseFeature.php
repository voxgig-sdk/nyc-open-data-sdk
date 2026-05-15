<?php
declare(strict_types=1);

// NycOpenData SDK base feature

class NycOpenDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NycOpenDataContext $ctx, array $options): void {}
    public function PostConstruct(NycOpenDataContext $ctx): void {}
    public function PostConstructEntity(NycOpenDataContext $ctx): void {}
    public function SetData(NycOpenDataContext $ctx): void {}
    public function GetData(NycOpenDataContext $ctx): void {}
    public function GetMatch(NycOpenDataContext $ctx): void {}
    public function SetMatch(NycOpenDataContext $ctx): void {}
    public function PrePoint(NycOpenDataContext $ctx): void {}
    public function PreSpec(NycOpenDataContext $ctx): void {}
    public function PreRequest(NycOpenDataContext $ctx): void {}
    public function PreResponse(NycOpenDataContext $ctx): void {}
    public function PreResult(NycOpenDataContext $ctx): void {}
    public function PreDone(NycOpenDataContext $ctx): void {}
    public function PreUnexpected(NycOpenDataContext $ctx): void {}
}
