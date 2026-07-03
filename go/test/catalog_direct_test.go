package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/nyc-open-data-sdk/go"
	"github.com/voxgig-sdk/nyc-open-data-sdk/go/core"
)

func TestCatalogDirect(t *testing.T) {
	t.Run("direct-list-catalog", func(t *testing.T) {
		setup := catalogDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-catalog", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		client := setup.client


		result, err := client.Direct(map[string]any{
			"path":   "api/catalog/v1",
			"method": "GET",
			"params": map[string]any{},
		})
		if setup.live {
			// Live mode is lenient: synthetic IDs frequently 4xx and the
			// list-response shape varies wildly across public APIs. Skip
			// rather than fail when the call doesn't return a usable list.
			if err != nil {
				t.Skipf("list call failed (likely synthetic IDs against live API): %v", err)
			}
			if result["ok"] != true {
				t.Skipf("list call not ok (likely synthetic IDs against live API): %v", result)
			}
			status := core.ToInt(result["status"])
			if status < 200 || status >= 300 {
				t.Skipf("expected 2xx status, got %v", result["status"])
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
		}
	})

}

type catalogDirectSetupResult struct {
	client *sdk.NycOpenDataSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func catalogDirectSetup(mockres any) *catalogDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"NYCOPENDATA_TEST_CATALOG_ENTID": map[string]any{},
		"NYCOPENDATA_TEST_LIVE":    "FALSE",
		"NYCOPENDATA_APIKEY":       "NONE",
	})

	live := env["NYCOPENDATA_TEST_LIVE"] == "TRUE"

	if live {
		mergedOpts := map[string]any{
			"apikey": env["NYCOPENDATA_APIKEY"],
		}
		client := sdk.NewNycOpenDataSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["NYCOPENDATA_TEST_CATALOG_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &catalogDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewNycOpenDataSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &catalogDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
